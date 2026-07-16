import type { AssessmentOutcome } from "../../../generated/prisma/enums";

export const engineVersion = "deterministic-v1";
export const productDataVersion = "demo-product-data-v1";

export type ProfileAnswer = {
  questionCode?: string;
  optionValue?: string;
  valueText?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
};

export type CustomerRecommendationProfile = {
  skinType: "balanced" | "dry" | "oily" | "combination" | "uncertain";
  oiliness: "low" | "medium" | "high" | "variable" | "unknown";
  dryness: "none" | "occasional" | "frequent" | "unknown";
  sensitivity: "low" | "medium" | "high" | "unknown";
  concerns: string[];
  allergies: string[];
  previousReaction: boolean;
  prescriptionUse: boolean;
  pregnancyOrBreastfeeding: boolean;
  routinePreference: "simple" | "detailed" | "unknown";
  safetyFlags: string[];
  assessmentOutcome?: AssessmentOutcome | null;
};

export type ProductCandidate = {
  id: string;
  slug: string;
  nameAr: string;
  sortOrder: number;
  status: string;
  usageAr: string | null;
  safetyNoticeAr: string | null;
  shortDescriptionAr: string | null;
  variants: Array<{
    id: string;
    nameAr: string;
    sizeLabel: string | null;
    stock: number;
    isDefault: boolean;
    isActive: boolean;
    price: unknown;
    currency: string;
  }>;
  ingredients: Array<{ ingredient: { id: string; slug: string; nameAr: string } }>;
  skinCompatibility: Array<{ skinType: { slug: string; nameAr: string } }>;
  concernMappings: Array<{ skinConcern: { slug: string; nameAr: string } }>;
};

export type ReadinessResult = {
  ready: boolean;
  missing: string[];
};

export type Exclusion = {
  productId: string;
  productNameAr: string;
  code: string;
  internalReason: string;
  customerSafeReason: string;
};

export type ScoreContribution = {
  code: string;
  labelAr: string;
  delta: number;
};

export type ScoredProduct = {
  product: ProductCandidate;
  variant: ProductCandidate["variants"][number];
  score: number;
  matchLevel: string;
  contributions: ScoreContribution[];
  explanationAr: string;
};

export type RecommendationDecision = {
  status:
    | "GENERATED"
    | "NO_ELIGIBLE_PRODUCT"
    | "WITHHELD_FOR_SAFETY"
    | "NEEDS_HUMAN_REVIEW"
    | "INSUFFICIENT_PRODUCT_DATA";
  profile: CustomerRecommendationProfile;
  eligibility: { allowed: boolean; reasons: string[] };
  exclusions: Exclusion[];
  scored: ScoredProduct[];
  primary?: ScoredProduct;
  alternatives: ScoredProduct[];
  safetyNotices: string[];
};
