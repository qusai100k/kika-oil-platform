import { Prisma, RecommendationStatus, RecordStatus } from "../../../generated/prisma/client";
import { getDb } from "@/server/db/client";
import { addVariant } from "@/server/commerce/cart";
import { recommendationEligibility } from "./eligibility";
import { excludeProduct } from "./exclusions";
import { explanationFor, safetyNotice } from "./explanations";
import { buildRecommendationProfile } from "./profile";
import { productReadiness, readinessSummary } from "./readiness";
import { rankProducts, scoreProduct } from "./scoring";
import { engineVersion, productDataVersion, type ProductCandidate, type ProfileAnswer, type RecommendationDecision } from "./types";

const includeProducts = {
  variants: { orderBy: [{ isDefault: "desc" as const }, { sortOrder: "asc" as const }] },
  ingredients: { include: { ingredient: true }, orderBy: { displayOrder: "asc" as const } },
  skinCompatibility: { include: { skinType: true } },
  concernMappings: { include: { skinConcern: true } },
};

export async function activeRecommendationConfig() {
  return getDb().recommendationConfig.findFirst({
    where: { status: RecordStatus.ACTIVE },
    include: { weights: true, rules: true, explanationTemplates: true, productRules: true },
    orderBy: { version: "desc" },
  });
}

export async function recommendationProducts() {
  return getDb().product.findMany({
    where: { status: "ACTIVE", deletedAt: null },
    include: includeProducts,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  }) as unknown as Promise<ProductCandidate[]>;
}

export async function productReadinessRows() {
  return readinessSummary(await recommendationProducts());
}

export function decideRecommendation(
  profile: ReturnType<typeof buildRecommendationProfile>,
  products: ProductCandidate[],
  eligibility: { allowed: boolean; reasons: string[] },
  hasConfig: boolean,
): RecommendationDecision {
  if (!eligibility.allowed)
    return { status: "WITHHELD_FOR_SAFETY", profile, eligibility, exclusions: [], scored: [], alternatives: [], safetyNotices: [safetyNotice()] };
  if (!hasConfig)
    return { status: "INSUFFICIENT_PRODUCT_DATA", profile, eligibility, exclusions: [], scored: [], alternatives: [], safetyNotices: [safetyNotice()] };
  if (profile.safetyFlags.length)
    return { status: "NEEDS_HUMAN_REVIEW", profile, eligibility, exclusions: [], scored: [], alternatives: [], safetyNotices: [safetyNotice()] };

  const exclusions = products.flatMap((product) => excludeProduct(profile, product));
  const blockedIds = new Set(exclusions.map((item) => item.productId));
  const scored = rankProducts(products.filter((product) => !blockedIds.has(product.id)).map((product) => scoreProduct(profile, product)).filter((item): item is NonNullable<typeof item> => item !== null));
  for (const item of scored) item.explanationAr = explanationFor(item);

  if (!products.length || products.every((product) => !productReadiness(product).ready))
    return { status: "INSUFFICIENT_PRODUCT_DATA", profile, eligibility, exclusions, scored, alternatives: [], safetyNotices: [safetyNotice()] };
  if (!scored.length)
    return { status: "NO_ELIGIBLE_PRODUCT", profile, eligibility, exclusions, scored, alternatives: [], safetyNotices: [safetyNotice()] };

  return {
    status: "GENERATED",
    profile,
    eligibility,
    exclusions,
    scored,
    primary: scored[0],
    alternatives: scored.slice(1, 3),
    safetyNotices: [safetyNotice()],
  };
}

export async function generateRecommendation(userId: string, assessmentId: string, idempotencyKey: string) {
  const db = getDb();
  const prior = await db.recommendation.findUnique({ where: { idempotencyKey }, include: { items: true } });
  if (prior) {
    if (prior.userId !== userId || prior.assessmentId !== assessmentId) throw new Error("IDEMPOTENCY_OWNERSHIP");
    return prior;
  }

  return db.$transaction(async (tx) => {
    const assessment = await tx.skinAssessment.findFirst({ where: { id: assessmentId, userId, deletedAt: null } });
    if (!assessment) throw new Error("ASSESSMENT_NOT_FOUND");
    const config = await tx.recommendationConfig.findFirst({ where: { status: RecordStatus.ACTIVE }, orderBy: { version: "desc" } });
    const products = (await tx.product.findMany({
      where: { status: "ACTIVE", deletedAt: null },
      include: includeProducts,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    })) as unknown as ProductCandidate[];
    const answers = (Array.isArray(assessment.answersSnapshot) ? assessment.answersSnapshot : []) as ProfileAnswer[];
    const eligibility = recommendationEligibility(assessment);
    const profile = buildRecommendationProfile(answers, assessment.resultStatus);
    const decision = decideRecommendation(profile, products, eligibility, Boolean(config));
    const previous = await tx.recommendation.findFirst({
      where: { userId, assessmentId, status: { notIn: [RecommendationStatus.SUPERSEDED, RecommendationStatus.EXPIRED] } },
      orderBy: { createdAt: "desc" },
    });
    if (previous?.status === RecommendationStatus.GENERATED && decision.status === "GENERATED") return previous;

    const row = await tx.recommendation.create({
      data: {
        userId,
        assessmentId,
        configId: config?.id,
        configVersion: config?.version ?? 0,
        engineVersion,
        productDataVersion,
        status: decision.status as RecommendationStatus,
        matchLevel: decision.primary?.matchLevel,
        explanationAr: decision.primary?.explanationAr ?? noResultMessage(decision.status),
        safetyNoticeAr: decision.safetyNotices.join(" "),
        profileSnapshot: decision.profile as unknown as Prisma.InputJsonValue,
        eligibilitySnapshot: decision.eligibility as unknown as Prisma.InputJsonValue,
        excludedProductsSnapshot: decision.exclusions as unknown as Prisma.InputJsonValue,
        scoreSnapshot: decision.scored.map((item) => ({ productId: item.product.id, score: item.score, contributions: item.contributions })) as unknown as Prisma.InputJsonValue,
        rankingSnapshot: decision.scored.map((item, index) => ({ rank: index + 1, productId: item.product.id, score: item.score })) as unknown as Prisma.InputJsonValue,
        productSnapshot: decision.scored.map((item) => snapshotProduct(item)) as unknown as Prisma.InputJsonValue,
        explanationSnapshot: { primary: decision.primary?.explanationAr, alternatives: decision.alternatives.map((item) => item.explanationAr), notices: decision.safetyNotices } as Prisma.InputJsonValue,
        idempotencyKey,
        generatedAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        items: {
          create: decision.scored.slice(0, 3).map((item, index) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            rank: index + 1,
            score: item.score,
            matchLevel: item.matchLevel,
            role: index === 0 ? "PRIMARY" : "ALTERNATIVE",
            explanationAr: item.explanationAr,
            scoreContributions: item.contributions as unknown as Prisma.InputJsonValue,
            productSnapshot: snapshotProduct(item) as unknown as Prisma.InputJsonValue,
          })),
        },
        statusHistory: { create: { toStatus: decision.status as RecommendationStatus, noteAr: "تم تشغيل محرك الترشيح الحتمي." } },
      },
      include: { items: true },
    });
    if (previous && previous.id !== row.id)
      await tx.recommendation.update({ where: { id: previous.id }, data: { status: RecommendationStatus.SUPERSEDED, supersededAt: new Date(), supersededById: row.id, statusHistory: { create: { fromStatus: previous.status, toStatus: RecommendationStatus.SUPERSEDED, noteAr: "تم إنشاء توصية أحدث." } } } });
    await tx.auditLog.create({ data: { actorUserId: userId, action: "RECOMMENDATION_GENERATED", resourceType: "Recommendation", resourceId: row.id, outcome: "SUCCESS", metadata: { status: row.status, configVersion: row.configVersion, itemCount: row.items.length } } });
    return row;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 15_000 });
}

function noResultMessage(status: RecommendationDecision["status"]) {
  if (status === "WITHHELD_FOR_SAFETY") return "تم حجب التوصية لأن نتيجة السلامة لا تسمح بإرشاد منتج الآن.";
  if (status === "NEEDS_HUMAN_REVIEW") return "يفضل انتظار مراجعة مؤهلة قبل إرشاد المنتج.";
  if (status === "INSUFFICIENT_PRODUCT_DATA") return "معلومات المنتجات أو إعدادات الترشيح تحتاج اكتمالًا أو اعتمادًا.";
  return "لم تنتج المعلومات المتاحة مطابقة آمنة كافية، لذلك لن نفرض منتجًا.";
}

function snapshotProduct(item: { product: ProductCandidate; variant: ProductCandidate["variants"][number]; score: number; matchLevel: string }) {
  return {
    productId: item.product.id,
    slug: item.product.slug,
    nameAr: item.product.nameAr,
    variantId: item.variant.id,
    variantNameAr: item.variant.nameAr,
    sizeLabel: item.variant.sizeLabel,
    stock: item.variant.stock,
    price: String(item.variant.price),
    currency: item.variant.currency,
    score: item.score,
    matchLevel: item.matchLevel,
  };
}

export async function ownedRecommendation(userId: string, id: string) {
  const row = await getDb().recommendation.findFirst({ where: { id, userId }, include: { items: { orderBy: { rank: "asc" }, include: { product: true, variant: true } }, assessment: true } });
  if (!row) throw new Error("RECOMMENDATION_NOT_FOUND");
  return row;
}

export async function recommendationsForUser(userId: string) {
  return getDb().recommendation.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { items: { orderBy: { rank: "asc" }, take: 1, include: { product: true } }, assessment: true } });
}

export async function addRecommendedVariantToCart(userId: string, recommendationId: string, itemId: string) {
  const recommendation = await ownedRecommendation(userId, recommendationId);
  const item = recommendation.items.find((entry) => entry.id === itemId);
  if (!item?.variantId) throw new Error("RECOMMENDED_VARIANT_NOT_FOUND");
  await addVariant(userId, item.variantId, 1);
  await getDb().auditLog.create({ data: { actorUserId: userId, action: "RECOMMENDATION_ADD_TO_CART", resourceType: "Recommendation", resourceId: recommendationId, outcome: "SUCCESS", metadata: { itemRank: item.rank } } });
}
