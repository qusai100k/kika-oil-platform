-- Phase 7 development migration.
-- Existing Recommendation rows were provisional placeholders and are cleared before the schema is expanded.
DELETE FROM "RecommendationItem";
DELETE FROM "Recommendation";
DELETE FROM "RecommendationRule";

CREATE TYPE "RecommendationRuleType" AS ENUM ('HARD_EXCLUSION', 'SCORE', 'PENALTY');
CREATE TYPE "RecommendationApprovalStatus" AS ENUM ('DRAFT', 'PROVISIONAL', 'REVIEW_REQUIRED', 'APPROVED', 'ARCHIVED');

BEGIN;
CREATE TYPE "RecommendationStatus_new" AS ENUM ('PENDING', 'GENERATED', 'NO_ELIGIBLE_PRODUCT', 'WITHHELD_FOR_SAFETY', 'NEEDS_HUMAN_REVIEW', 'INSUFFICIENT_PRODUCT_DATA', 'EXPIRED', 'SUPERSEDED');
ALTER TABLE "Recommendation" ALTER COLUMN "status" TYPE "RecommendationStatus_new" USING ("status"::text::"RecommendationStatus_new");
ALTER TYPE "RecommendationStatus" RENAME TO "RecommendationStatus_old";
ALTER TYPE "RecommendationStatus_new" RENAME TO "RecommendationStatus";
DROP TYPE "RecommendationStatus_old";
COMMIT;

DROP INDEX IF EXISTS "RecommendationRule_code_version_key";
DROP INDEX IF EXISTS "RecommendationRule_status_version_idx";

CREATE TABLE "ProductIngredientRestriction" (
  "id" UUID NOT NULL,
  "ingredientId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "labelAr" TEXT NOT NULL,
  "isHardExclusion" BOOLEAN NOT NULL DEFAULT true,
  "requiresSpecialistApproval" BOOLEAN NOT NULL DEFAULT true,
  "approvalStatus" "RecommendationApprovalStatus" NOT NULL DEFAULT 'PROVISIONAL',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProductIngredientRestriction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationConfig" (
  "id" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "nameAr" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT',
  "approvalStatus" "RecommendationApprovalStatus" NOT NULL DEFAULT 'PROVISIONAL',
  "engineVersion" TEXT NOT NULL,
  "isProvisional" BOOLEAN NOT NULL DEFAULT true,
  "publishedAt" TIMESTAMP(3),
  "archivedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RecommendationConfig_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationScoreWeight" (
  "id" UUID NOT NULL,
  "configId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "labelAr" TEXT NOT NULL,
  "weight" INTEGER NOT NULL,
  "minScore" INTEGER NOT NULL DEFAULT -100,
  "maxScore" INTEGER NOT NULL DEFAULT 100,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "RecommendationScoreWeight_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProductRecommendationRule" (
  "id" UUID NOT NULL,
  "configId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "type" "RecommendationRuleType" NOT NULL,
  "scoreDelta" INTEGER NOT NULL DEFAULT 0,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "internalReason" TEXT NOT NULL,
  "explanationAr" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "approvalStatus" "RecommendationApprovalStatus" NOT NULL DEFAULT 'PROVISIONAL',
  CONSTRAINT "ProductRecommendationRule_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationExplanationTemplate" (
  "id" UUID NOT NULL,
  "configId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "labelAr" TEXT NOT NULL,
  "bodyAr" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "RecommendationExplanationTemplate_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RecommendationStatusHistory" (
  "id" UUID NOT NULL,
  "recommendationId" UUID NOT NULL,
  "fromStatus" "RecommendationStatus",
  "toStatus" "RecommendationStatus" NOT NULL,
  "noteAr" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RecommendationStatusHistory_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Recommendation" DROP COLUMN "referralCode",
DROP COLUMN "rulesetVersion",
ADD COLUMN "configId" UUID,
ADD COLUMN "configVersion" INTEGER NOT NULL,
ADD COLUMN "eligibilitySnapshot" JSONB NOT NULL,
ADD COLUMN "engineVersion" TEXT NOT NULL,
ADD COLUMN "excludedProductsSnapshot" JSONB NOT NULL,
ADD COLUMN "expiresAt" TIMESTAMP(3),
ADD COLUMN "explanationSnapshot" JSONB NOT NULL,
ADD COLUMN "generatedAt" TIMESTAMP(3),
ADD COLUMN "idempotencyKey" TEXT NOT NULL,
ADD COLUMN "matchLevel" TEXT,
ADD COLUMN "productSnapshot" JSONB NOT NULL,
ADD COLUMN "profileSnapshot" JSONB NOT NULL,
ADD COLUMN "rankingSnapshot" JSONB NOT NULL,
ADD COLUMN "safetyNoticeAr" TEXT,
ADD COLUMN "scoreSnapshot" JSONB NOT NULL,
ADD COLUMN "supersededAt" TIMESTAMP(3),
ADD COLUMN "supersededById" UUID,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "RecommendationItem" DROP COLUMN "reasonCode",
ADD COLUMN "explanationAr" TEXT NOT NULL,
ADD COLUMN "matchLevel" TEXT NOT NULL,
ADD COLUMN "productSnapshot" JSONB NOT NULL,
ADD COLUMN "role" TEXT NOT NULL,
ADD COLUMN "score" INTEGER NOT NULL,
ADD COLUMN "scoreContributions" JSONB NOT NULL,
ADD COLUMN "variantId" UUID;

ALTER TABLE "RecommendationRule" DROP COLUMN "approvedAt",
DROP COLUMN "approvedBy",
DROP COLUMN "ruleDefinition",
DROP COLUMN "status",
DROP COLUMN "version",
ADD COLUMN "approvalStatus" "RecommendationApprovalStatus" NOT NULL DEFAULT 'PROVISIONAL',
ADD COLUMN "configId" UUID NOT NULL,
ADD COLUMN "customerExplanationAr" TEXT,
ADD COLUMN "internalReason" TEXT NOT NULL,
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "matchValue" TEXT,
ADD COLUMN "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "productField" TEXT,
ADD COLUMN "profileField" TEXT,
ADD COLUMN "requiresSpecialistApproval" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "scoreDelta" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "type" "RecommendationRuleType" NOT NULL;

CREATE INDEX "ProductIngredientRestriction_approvalStatus_isActive_idx" ON "ProductIngredientRestriction"("approvalStatus", "isActive");
CREATE UNIQUE INDEX "ProductIngredientRestriction_ingredientId_code_key" ON "ProductIngredientRestriction"("ingredientId", "code");
CREATE INDEX "RecommendationConfig_status_version_idx" ON "RecommendationConfig"("status", "version");
CREATE UNIQUE INDEX "RecommendationConfig_key_version_key" ON "RecommendationConfig"("key", "version");
CREATE INDEX "RecommendationScoreWeight_configId_sortOrder_idx" ON "RecommendationScoreWeight"("configId", "sortOrder");
CREATE UNIQUE INDEX "RecommendationScoreWeight_configId_code_key" ON "RecommendationScoreWeight"("configId", "code");
CREATE INDEX "ProductRecommendationRule_configId_type_priority_idx" ON "ProductRecommendationRule"("configId", "type", "priority");
CREATE UNIQUE INDEX "ProductRecommendationRule_configId_productId_code_key" ON "ProductRecommendationRule"("configId", "productId", "code");
CREATE INDEX "RecommendationExplanationTemplate_configId_sortOrder_idx" ON "RecommendationExplanationTemplate"("configId", "sortOrder");
CREATE UNIQUE INDEX "RecommendationExplanationTemplate_configId_code_key" ON "RecommendationExplanationTemplate"("configId", "code");
CREATE INDEX "RecommendationStatusHistory_recommendationId_createdAt_idx" ON "RecommendationStatusHistory"("recommendationId", "createdAt");
CREATE UNIQUE INDEX "Recommendation_idempotencyKey_key" ON "Recommendation"("idempotencyKey");
CREATE UNIQUE INDEX "Recommendation_supersededById_key" ON "Recommendation"("supersededById");
CREATE INDEX "Recommendation_assessmentId_status_idx" ON "Recommendation"("assessmentId", "status");
CREATE INDEX "Recommendation_configId_configVersion_idx" ON "Recommendation"("configId", "configVersion");
CREATE INDEX "RecommendationItem_productId_rank_idx" ON "RecommendationItem"("productId", "rank");
CREATE INDEX "RecommendationRule_configId_type_priority_idx" ON "RecommendationRule"("configId", "type", "priority");
CREATE UNIQUE INDEX "RecommendationRule_configId_code_key" ON "RecommendationRule"("configId", "code");

ALTER TABLE "ProductIngredientRestriction" ADD CONSTRAINT "ProductIngredientRestriction_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_supersededById_fkey" FOREIGN KEY ("supersededById") REFERENCES "Recommendation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "RecommendationItem" ADD CONSTRAINT "RecommendationItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "RecommendationRule" ADD CONSTRAINT "RecommendationRule_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecommendationScoreWeight" ADD CONSTRAINT "RecommendationScoreWeight_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProductRecommendationRule" ADD CONSTRAINT "ProductRecommendationRule_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProductRecommendationRule" ADD CONSTRAINT "ProductRecommendationRule_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecommendationExplanationTemplate" ADD CONSTRAINT "RecommendationExplanationTemplate_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecommendationStatusHistory" ADD CONSTRAINT "RecommendationStatusHistory_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "Recommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
