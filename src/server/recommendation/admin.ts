import { Prisma, RecordStatus, UserRole } from "../../../generated/prisma/client";
import { getDb } from "@/server/db/client";
import { assertPermission, can } from "@/server/auth/authorization";
import { redactAudit, sanitizePlainText } from "@/server/admin/rules";
import { engineVersion } from "./types";

export type RecommendationActor = { id: string; role: UserRole };

function configure(actor: RecommendationActor) {
  assertPermission(actor.role, "recommendations:configure");
}

async function audit(tx: Prisma.TransactionClient, actor: RecommendationActor, action: string, resourceId: string, metadata?: unknown) {
  await tx.auditLog.create({ data: { actorUserId: actor.id, action, resourceType: "RecommendationConfig", resourceId, outcome: "SUCCESS", metadata: redactAudit(metadata) as Prisma.InputJsonValue } });
}

export async function validateRecommendationConfig(id: string) {
  const config = await getDb().recommendationConfig.findUnique({ where: { id }, include: { weights: true, explanationTemplates: true } });
  if (!config) throw new Error("CONFIG_NOT_FOUND");
  const errors: string[] = [];
  if (!config.weights.length) errors.push("يلزم وزن واحد على الأقل");
  if (!config.explanationTemplates.length) errors.push("يلزم قالب شرح واحد على الأقل");
  if (!config.isProvisional && config.approvalStatus !== "APPROVED") errors.push("الإعداد غير المبدئي يحتاج اعتمادًا قبل النشر");
  return errors;
}

export async function createRecommendationConfig(actor: RecommendationActor, nameAr: string) {
  configure(actor);
  const db = getDb();
  const latest = await db.recommendationConfig.findFirst({ where: { key: "deterministic-demo" }, orderBy: { version: "desc" } });
  return db.$transaction(async (tx) => {
    const row = await tx.recommendationConfig.create({ data: { key: "deterministic-demo", nameAr: sanitizePlainText(nameAr).slice(0, 120), version: (latest?.version ?? 0) + 1, status: RecordStatus.DRAFT, approvalStatus: "PROVISIONAL", engineVersion, isProvisional: true } });
    await tx.recommendationScoreWeight.createMany({ data: [{ configId: row.id, code: "base", labelAr: "قاعدة مبدئية", weight: 40 }, { configId: row.id, code: "skin_type", labelAr: "توافق نوع البشرة", weight: 25 }, { configId: row.id, code: "concern", labelAr: "ارتباط الاهتمام", weight: 14 }] });
    await tx.recommendationExplanationTemplate.create({ data: { configId: row.id, code: "safe_notice", labelAr: "تنبيه السلامة", bodyAr: "لا تمثل هذه النتيجة تشخيصًا طبيًا." } });
    await audit(tx, actor, "RECOMMENDATION_CONFIG_CREATED", row.id, { version: row.version });
    return row;
  });
}

export async function duplicateRecommendationConfig(actor: RecommendationActor, id: string) {
  configure(actor);
  const source = await getDb().recommendationConfig.findUnique({ where: { id }, include: { weights: true, rules: true, explanationTemplates: true, productRules: true } });
  if (!source) throw new Error("CONFIG_NOT_FOUND");
  const latest = await getDb().recommendationConfig.findFirst({ where: { key: source.key }, orderBy: { version: "desc" } });
  return getDb().$transaction(async (tx) => {
    const row = await tx.recommendationConfig.create({ data: { key: source.key, nameAr: source.nameAr, version: (latest?.version ?? 0) + 1, status: RecordStatus.DRAFT, approvalStatus: "PROVISIONAL", engineVersion: source.engineVersion, isProvisional: true } });
    if (source.weights.length) await tx.recommendationScoreWeight.createMany({ data: source.weights.map((w) => ({ configId: row.id, code: w.code, labelAr: w.labelAr, weight: w.weight, minScore: w.minScore, maxScore: w.maxScore, sortOrder: w.sortOrder, isActive: w.isActive })) });
    if (source.explanationTemplates.length) await tx.recommendationExplanationTemplate.createMany({ data: source.explanationTemplates.map((t) => ({ configId: row.id, code: t.code, labelAr: t.labelAr, bodyAr: t.bodyAr, sortOrder: t.sortOrder, isActive: t.isActive })) });
    await audit(tx, actor, "RECOMMENDATION_CONFIG_DUPLICATED", row.id, { sourceId: id, version: row.version });
    return row;
  }, { timeout: 15_000 });
}

export async function publishRecommendationConfig(actor: RecommendationActor, id: string, confirmation: string) {
  configure(actor);
  const row = await getDb().recommendationConfig.findUnique({ where: { id } });
  if (!row) throw new Error("CONFIG_NOT_FOUND");
  if (row.status !== RecordStatus.DRAFT) throw new Error("PUBLISHED_CONFIG_IMMUTABLE");
  if (confirmation !== `PUBLISH REC v${row.version}`) throw new Error("PUBLISH_CONFIRMATION_REQUIRED");
  const errors = await validateRecommendationConfig(id);
  if (errors.length) throw new Error(`CONFIG_INVALID:${errors.join("|")}`);
  return getDb().$transaction(async (tx) => {
    const updated = await tx.recommendationConfig.update({ where: { id }, data: { status: RecordStatus.ACTIVE, publishedAt: new Date() } });
    await audit(tx, actor, "RECOMMENDATION_CONFIG_PUBLISHED", id, { version: row.version, provisional: row.isProvisional });
    return updated;
  });
}

export async function archiveRecommendationConfig(actor: RecommendationActor, id: string, confirmation: string) {
  configure(actor);
  const row = await getDb().recommendationConfig.findUnique({ where: { id } });
  if (!row) throw new Error("CONFIG_NOT_FOUND");
  if (confirmation !== `ARCHIVE REC v${row.version}`) throw new Error("ARCHIVE_CONFIRMATION_REQUIRED");
  return getDb().$transaction(async (tx) => {
    const updated = await tx.recommendationConfig.update({ where: { id }, data: { status: RecordStatus.ARCHIVED, archivedAt: new Date() } });
    await audit(tx, actor, "RECOMMENDATION_CONFIG_ARCHIVED", id, { version: row.version });
    return updated;
  });
}

export function canApproveRecommendationSafety(role: UserRole) {
  return can(role, "settings:write");
}
