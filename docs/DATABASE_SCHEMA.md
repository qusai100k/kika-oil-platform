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

