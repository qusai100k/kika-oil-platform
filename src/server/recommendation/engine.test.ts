import { describe, expect, it } from "vitest";
import { AssessmentOutcome, AssessmentStatus } from "../../../generated/prisma/enums";
import { recommendationEligibility } from "./eligibility";
import { excludeProduct } from "./exclusions";
import { explanationFor } from "./explanations";
import { buildRecommendationProfile } from "./profile";
import { decideRecommendation } from "./service";
import { productReadiness } from "./readiness";
import { rankProducts, scoreProduct } from "./scoring";
import type { ProductCandidate, ProfileAnswer } from "./types";

const product = (overrides: Partial<ProductCandidate> = {}): ProductCandidate => ({
  id: overrides.id ?? "11111111-1111-4111-8111-111111111111",
  slug: overrides.slug ?? "daily-balance-oil",
  nameAr: overrides.nameAr ?? "زيت التوازن اليومي",
  sortOrder: overrides.sortOrder ?? 1,
  status: overrides.status ?? "ACTIVE",
  usageAr: "usageAr" in overrides ? overrides.usageAr! : "استخدام تجريبي",
  safetyNoticeAr: "safetyNoticeAr" in overrides ? overrides.safetyNoticeAr! : "تنبيه تجريبي",
  shortDescriptionAr: overrides.shortDescriptionAr ?? "وصف",
  variants: overrides.variants ?? [{ id: "22222222-2222-4222-8222-222222222222", nameAr: "15ml", sizeLabel: "15 ml", stock: 5, isDefault: true, isActive: true, price: 180, currency: "XXX" }],
  ingredients: overrides.ingredients ?? [{ ingredient: { id: "33333333-3333-4333-8333-333333333333", slug: "jojoba-demo", nameAr: "جوجوبا" } }],
  skinCompatibility: overrides.skinCompatibility ?? [{ skinType: { slug: "balanced", nameAr: "متوازنة" } }, { skinType: { slug: "oily", nameAr: "دهنية" } }],
  concernMappings: overrides.concernMappings ?? [{ skinConcern: { slug: "balance", nameAr: "توازن" } }],
});

const answers: ProfileAnswer[] = [
  { questionCode: "oiliness", optionValue: "v2" },
  { questionCode: "dryness", optionValue: "v0" },
  { questionCode: "sensitivity", optionValue: "v0" },
  { questionCode: "known_allergy", optionValue: "v0" },
  { questionCode: "previous_reaction", optionValue: "v0" },
  { questionCode: "prescription_topical", optionValue: "v0" },
  { questionCode: "pregnancy", optionValue: "v0" },
  { questionCode: "main_goal", optionValue: "v1" },
  { questionCode: "routine_preference", optionValue: "v0" },
];

describe("recommendation eligibility", () => {
  it("allows ready submitted assessment snapshots", () => expect(recommendationEligibility({ status: AssessmentStatus.READY_FOR_FUTURE_RECOMMENDATION, resultStatus: AssessmentOutcome.READY_FOR_FUTURE_RECOMMENDATION, consentVersion: "v1", templateSnapshot: [], answersSnapshot: [] }).allowed).toBe(true));
  it("rejects referral assessments", () => expect(recommendationEligibility({ status: AssessmentStatus.REFERRED, resultStatus: AssessmentOutcome.REFER_TO_SPECIALIST, consentVersion: "v1", templateSnapshot: [], answersSnapshot: [] }).reasons).toContain("ASSESSMENT_NOT_READY"));
  it("rejects unresolved needs-info", () => expect(recommendationEligibility({ status: AssessmentStatus.NEEDS_MORE_INFORMATION, resultStatus: AssessmentOutcome.NEEDS_MORE_INFORMATION, consentVersion: "v1", templateSnapshot: [], answersSnapshot: [] }).allowed).toBe(false));
  it("rejects missing consent", () => expect(recommendationEligibility({ status: AssessmentStatus.READY_FOR_FUTURE_RECOMMENDATION, resultStatus: AssessmentOutcome.READY_FOR_FUTURE_RECOMMENDATION, consentVersion: null, templateSnapshot: [], answersSnapshot: [] }).reasons).toContain("MISSING_CONSENT"));
  it("rejects obsolete snapshot", () => expect(recommendationEligibility({ status: AssessmentStatus.READY_FOR_FUTURE_RECOMMENDATION, resultStatus: AssessmentOutcome.READY_FOR_FUTURE_RECOMMENDATION, consentVersion: "v1", templateSnapshot: {}, answersSnapshot: [] }).reasons).toContain("INVALID_OR_OBSOLETE_ASSESSMENT_SNAPSHOT"));
});

describe("profile, readiness, exclusions", () => {
  it("builds structured profile without diagnosis labels", () => expect(buildRecommendationProfile(answers).concerns).toContain("balance"));
  it("excludes missing product readiness", () => expect(productReadiness(product({ usageAr: null })).missing).toContain("usage instructions"));
  it("excludes inactive or unavailable variants", () => expect(excludeProduct(buildRecommendationProfile(answers), product({ variants: [] })).map((x) => x.code)).toContain("NO_AVAILABLE_VARIANT"));
  it("excludes incompatible skin type", () => expect(excludeProduct(buildRecommendationProfile(answers), product({ skinCompatibility: [{ skinType: { slug: "dry", nameAr: "جافة" } }] })).map((x) => x.code)).toContain("SKIN_TYPE_INCOMPATIBLE"));
  it("excludes declared allergy match", () => {
    const profile = buildRecommendationProfile([{ questionCode: "known_allergy", optionValue: "v1" }, { questionCode: "allergy_detail", valueText: "jojoba" }]);
    expect(excludeProduct(profile, product()).map((x) => x.code)).toContain("DECLARED_ALLERGY");
  });
  it("requires human review for safety flags", () => {
    const profile = buildRecommendationProfile([{ questionCode: "previous_reaction", optionValue: "v1" }]);
    expect(excludeProduct(profile, product()).map((x) => x.code)).toContain("HUMAN_REVIEW_REQUIRED");
  });
});

describe("scoring and ranking", () => {
  it("adds positive score contributions", () => expect(scoreProduct(buildRecommendationProfile(answers), product())?.contributions.some((x) => x.delta > 0)).toBe(true));
  it("adds negative sensitivity contribution", () => expect(scoreProduct(buildRecommendationProfile([{ ...answers[0] }, { questionCode: "sensitivity", optionValue: "v2" }]), product())?.contributions.some((x) => x.delta < 0)).toBe(true));
  it("keeps score within boundaries", () => expect(scoreProduct(buildRecommendationProfile(answers), product())!.score).toBeLessThanOrEqual(100));
  it("uses stable score ordering", () => expect(rankProducts([scoreProduct(buildRecommendationProfile(answers), product({ id: "b", sortOrder: 2 }))!, scoreProduct(buildRecommendationProfile(answers), product({ id: "a", sortOrder: 1 }))!])[0].product.id).toBe("a"));
  it("uses deterministic tie breaker", () => expect(rankProducts([scoreProduct(buildRecommendationProfile(answers), product({ id: "b", sortOrder: 1 }))!, scoreProduct(buildRecommendationProfile(answers), product({ id: "a", sortOrder: 1 }))!])[0].product.id).toBe("a"));
  it("does not force recommendation when no eligible product exists", () => expect(decideRecommendation(buildRecommendationProfile(answers), [product({ skinCompatibility: [{ skinType: { slug: "dry", nameAr: "جافة" } }] })], { allowed: true, reasons: [] }, true).status).toBe("NO_ELIGIBLE_PRODUCT"));
  it("returns primary and alternatives", () => expect(decideRecommendation(buildRecommendationProfile(answers), [product({ id: "a" }), product({ id: "b", sortOrder: 2 })], { allowed: true, reasons: [] }, true).alternatives).toHaveLength(1));
});

describe("explanations and safe states", () => {
  it("generates deterministic explanation", () => expect(explanationFor(scoreProduct(buildRecommendationProfile(answers), product())!)).toContain("لا تمثل"));
  it("does not include banned claims", () => expect(explanationFor(scoreProduct(buildRecommendationProfile(answers), product())!)).not.toMatch(/سيعالج|سيشفي|مضمون|100%/));
  it("withholds safety-blocked assessments", () => expect(decideRecommendation(buildRecommendationProfile(answers), [product()], { allowed: false, reasons: ["SAFETY"] }, true).status).toBe("WITHHELD_FOR_SAFETY"));
  it("returns insufficient config data", () => expect(decideRecommendation(buildRecommendationProfile(answers), [product()], { allowed: true, reasons: [] }, false).status).toBe("INSUFFICIENT_PRODUCT_DATA"));
});
