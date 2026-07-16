# Database Schema Foundation

The PostgreSQL/Prisma schema contains 36 models and 11 enums. It is provisional and intentionally includes future entities without implementing their workflows.

## Domains

- Identity: User, Account, Session, CustomerProfile, Address.
- Catalog: ProductCategory, Product, ProductVariant, ProductImage, Ingredient, ProductIngredient, SkinType, SkinConcern, compatibility mappings.
- Commerce: Cart, CartItem, Order, OrderItem, Coupon, Review.
- Guidance: AssessmentQuestion, AssessmentOption, SkinAssessment, SkinAssessmentAnswer, Recommendation, RecommendationItem, RecommendationRule.
- Consultation: SpecialistProfile, SpecialistAvailability, ConsultationBooking, ConsultationNote.
- Platform: Notification, ConsentRecord, AuditLog, SiteSetting.

## Design choices

- UUID primary keys; timestamps; soft deletion for user-facing mutable records where appropriate.
- PostgreSQL `Decimal(12,2)` for money and three-character provisional currency codes.
- Order item/address snapshots protect historical meaning.
- Published assessment/rule concepts are versionable; sensitive answers are not placed in AuditLog.
- Provider-neutral auth/account and meeting references; no payment-provider fields.
- Custom formulas are absent until the business model is approved.
- JSON is limited to snapshots, rule definitions, settings, and minimized audit metadata.
- Delete behavior is restrictive around financial, assessment, and consultation history.

## Database status

`prisma format`, `prisma validate`, and client generation pass. Migration and seed were attempted against the local PostgreSQL listener but failed because the provisional `postgres/postgres` credentials were rejected (`P1000`). No migration was created and no data was inserted. Supply a valid `DATABASE_URL`, then run the documented commands.

Database-level check constraints for positive quantity/rating/stock should be added in the first generated SQL migration; Prisma-level/server validation remains required.
# Phase 3 authentication update (2026-07-16)

`User`, `Account`, and `Session` now follow Better Auth's Prisma contract while preserving the platform role and domain relations. `Verification` stores expiring verification/reset values. `Address` gained optional `building` and `notes`; all address writes are scoped by authenticated `userId`. Migration: `20260716102036_phase_3_auth_accounts`.

## Phase 4 commerce update

Orders now store payment state, idempotency, tax, and immutable coupon/shipping snapshots. Order items store product slug, size, image, and currency snapshots. `CouponRedemption`, `OrderStatusHistory`, `InventoryMovement`, `CheckoutAttempt`, and `OrderCancellationRequest` provide enforcement and history. Migration: `20260716144500_phase_4_commerce_foundation`.
# Phase 5 admin operations update

Migration `20260716173500_phase_5_admin_operations` adds catalog SEO/storage/order fields, variant stock thresholds/default ordering, provider-neutral image metadata, inventory actor/reason/note/idempotency, payment confirmer/timestamp, review moderation metadata, and structured `ContentEntry` records. Foreign keys retain actor history with `SET NULL`; commerce snapshots remain immutable.
# Phase 6 assessment update

Adds template/rule/status-history models, outcome and question-type enums, conditional and safety metadata, progress and stale-save timestamps, typed numeric/date answers, submission idempotency, and immutable JSON snapshots.

# Phase 7 recommendation update

Migration `20260717003000_phase_7_recommendations` expands the guidance domain for deterministic product recommendations.

New and updated schema areas:

- `RecommendationConfig`, `RecommendationScoreWeight`, `ProductRecommendationRule`, and `RecommendationExplanationTemplate` provide versioned, publishable engine configuration.
- `ProductIngredientRestriction` records hard ingredient-level restrictions used before ranking.
- `Recommendation` now stores engine/config/product-data versions, immutable assessment/config/profile snapshots, idempotency keys, supersession links, no-result reasons, and status history.
- `RecommendationItem` stores product/variant snapshots, rank, score, match level, role, score contributions, and controlled explanation text.
- `RecommendationStatusHistory` records lifecycle changes without exposing sensitive assessment answers in routine logs.

Phase 7 uses the existing Preview/Development PostgreSQL database only. The recommendation data is provisional and must be approved before any production promotion.
