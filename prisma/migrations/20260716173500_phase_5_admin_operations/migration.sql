ALTER TYPE "InventoryMovementType" ADD VALUE IF NOT EXISTS 'RESTOCK';
ALTER TYPE "InventoryMovementType" ADD VALUE IF NOT EXISTS 'DAMAGE';
ALTER TYPE "InventoryMovementType" ADD VALUE IF NOT EXISTS 'CORRECTION';

ALTER TABLE "Product" ADD COLUMN "storageInstructionsAr" TEXT,
ADD COLUMN "seoTitleAr" TEXT,
ADD COLUMN "seoDescriptionAr" TEXT,
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ProductVariant" ADD COLUMN "lowStockThreshold" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "isDefault" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "ProductImage" ADD COLUMN "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "mimeType" TEXT,
ADD COLUMN "fileSize" INTEGER,
ADD COLUMN "storageKey" TEXT;
ALTER TABLE "Ingredient" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "SkinType" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "SkinConcern" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Order" ADD COLUMN "internalNote" TEXT,
ADD COLUMN "shippingReference" TEXT,
ADD COLUMN "paymentConfirmedAt" TIMESTAMP(3),
ADD COLUMN "paymentConfirmedById" UUID;
ALTER TABLE "InventoryMovement" ADD COLUMN "actorUserId" UUID,
ADD COLUMN "reason" TEXT,
ADD COLUMN "note" TEXT,
ADD COLUMN "idempotencyKey" TEXT;
ALTER TABLE "Review" ADD COLUMN "moderationReason" TEXT,
ADD COLUMN "moderatedAt" TIMESTAMP(3),
ADD COLUMN "moderatedById" UUID;

CREATE TABLE "ContentEntry" (
  "id" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "titleAr" TEXT,
  "bodyAr" TEXT,
  "url" TEXT,
  "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContentEntry_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ContentEntry_key_key" ON "ContentEntry"("key");
CREATE INDEX "ContentEntry_type_status_sortOrder_idx" ON "ContentEntry"("type", "status", "sortOrder");
CREATE UNIQUE INDEX "InventoryMovement_idempotencyKey_key" ON "InventoryMovement"("idempotencyKey");
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentConfirmedById_fkey" FOREIGN KEY ("paymentConfirmedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_moderatedById_fkey" FOREIGN KEY ("moderatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
