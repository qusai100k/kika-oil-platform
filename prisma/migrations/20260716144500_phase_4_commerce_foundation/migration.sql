CREATE TYPE "PaymentMethod" AS ENUM ('CASH_ON_DELIVERY', 'MANUAL_BANK_TRANSFER');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AWAITING_TRANSFER', 'PAYMENT_REVIEW', 'NOT_REQUIRED', 'PAID', 'CANCELLED');
CREATE TYPE "CouponType" AS ENUM ('FIXED', 'PERCENTAGE');
CREATE TYPE "InventoryMovementType" AS ENUM ('ORDER_DECREMENT', 'CANCELLATION_RESTORE', 'MANUAL_ADJUSTMENT');
CREATE TYPE "CancellationRequestStatus" AS ENUM ('REQUESTED', 'APPROVED', 'REJECTED');

ALTER TABLE "Coupon" DROP COLUMN "amount",
ADD COLUMN "isDemo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "maximumDiscount" DECIMAL(12,2),
ADD COLUMN "minimumSubtotal" DECIMAL(12,2),
ADD COLUMN "perCustomerLimit" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "type" "CouponType" NOT NULL DEFAULT 'FIXED',
ADD COLUMN "usageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "value" DECIMAL(12,2) NOT NULL;

ALTER TABLE "Order" ADD COLUMN "cancelledAt" TIMESTAMP(3), ADD COLUMN "couponSnapshot" JSONB, ADD COLUMN "customerNotes" TEXT, ADD COLUMN "idempotencyKey" TEXT NOT NULL, ADD COLUMN "paymentMethod" "PaymentMethod" NOT NULL, ADD COLUMN "paymentReference" TEXT, ADD COLUMN "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING', ADD COLUMN "shippingMethodSnapshot" JSONB NOT NULL, ADD COLUMN "taxTotal" DECIMAL(12,2) NOT NULL DEFAULT 0;
ALTER TABLE "OrderItem" ADD COLUMN "currency" VARCHAR(3) NOT NULL, ADD COLUMN "imageUrl" TEXT, ADD COLUMN "productSlug" TEXT NOT NULL, ADD COLUMN "sizeLabel" TEXT;

CREATE TABLE "CouponRedemption" ("id" UUID NOT NULL, "couponId" UUID NOT NULL, "userId" UUID NOT NULL, "orderId" UUID NOT NULL, "amount" DECIMAL(12,2) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "CouponRedemption_pkey" PRIMARY KEY ("id"));
CREATE TABLE "OrderStatusHistory" ("id" UUID NOT NULL, "orderId" UUID NOT NULL, "fromStatus" "OrderStatus", "toStatus" "OrderStatus" NOT NULL, "noteAr" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "OrderStatusHistory_pkey" PRIMARY KEY ("id"));
CREATE TABLE "InventoryMovement" ("id" UUID NOT NULL, "variantId" UUID NOT NULL, "orderId" UUID, "type" "InventoryMovementType" NOT NULL, "quantity" INTEGER NOT NULL, "balanceAfter" INTEGER NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "InventoryMovement_pkey" PRIMARY KEY ("id"));
CREATE TABLE "OrderCancellationRequest" ("id" UUID NOT NULL, "orderId" UUID NOT NULL, "userId" UUID NOT NULL, "reason" TEXT NOT NULL, "status" "CancellationRequestStatus" NOT NULL DEFAULT 'APPROVED', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "OrderCancellationRequest_pkey" PRIMARY KEY ("id"));
CREATE TABLE "CheckoutAttempt" ("id" UUID NOT NULL, "userId" UUID NOT NULL, "idempotencyKey" TEXT NOT NULL, "orderId" UUID, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "completedAt" TIMESTAMP(3), CONSTRAINT "CheckoutAttempt_pkey" PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "CouponRedemption_orderId_key" ON "CouponRedemption"("orderId"); CREATE INDEX "CouponRedemption_couponId_userId_createdAt_idx" ON "CouponRedemption"("couponId", "userId", "createdAt");
CREATE INDEX "OrderStatusHistory_orderId_createdAt_idx" ON "OrderStatusHistory"("orderId", "createdAt");
CREATE INDEX "InventoryMovement_variantId_createdAt_idx" ON "InventoryMovement"("variantId", "createdAt"); CREATE UNIQUE INDEX "InventoryMovement_orderId_variantId_type_key" ON "InventoryMovement"("orderId", "variantId", "type");
CREATE UNIQUE INDEX "OrderCancellationRequest_orderId_key" ON "OrderCancellationRequest"("orderId"); CREATE INDEX "OrderCancellationRequest_userId_createdAt_idx" ON "OrderCancellationRequest"("userId", "createdAt");
CREATE UNIQUE INDEX "CheckoutAttempt_idempotencyKey_key" ON "CheckoutAttempt"("idempotencyKey"); CREATE UNIQUE INDEX "CheckoutAttempt_orderId_key" ON "CheckoutAttempt"("orderId"); CREATE INDEX "CheckoutAttempt_userId_createdAt_idx" ON "CheckoutAttempt"("userId", "createdAt"); CREATE UNIQUE INDEX "Order_idempotencyKey_key" ON "Order"("idempotencyKey");

ALTER TABLE "CouponRedemption" ADD CONSTRAINT "CouponRedemption_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE; ALTER TABLE "CouponRedemption" ADD CONSTRAINT "CouponRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE; ALTER TABLE "CouponRedemption" ADD CONSTRAINT "CouponRedemption_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderStatusHistory" ADD CONSTRAINT "OrderStatusHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE; ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderCancellationRequest" ADD CONSTRAINT "OrderCancellationRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE; ALTER TABLE "OrderCancellationRequest" ADD CONSTRAINT "OrderCancellationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
