# Production Database Setup

Provider: Neon PostgreSQL

## Database separation

- Production database name: `kika_oil_production`
- Production database role: `kika_oil_prod_owner`
- Development database name: `neondb`

Production does not use the Development database.

## Migrations

The following migrations were applied to Production in order:

1. `20260716102036_phase_3_auth_accounts`
2. `20260716144500_phase_4_commerce_foundation`
3. `20260716173500_phase_5_admin_operations`
4. `20260716185900_phase_6_assessment_enums`
5. `20260716190000_phase_6_structured_assessment`
6. `20260716213000_phase_6_closure`

`prisma migrate status` reported that the Production schema is up to date.

## Seeded Production categories

Seeded:

- Required catalog categories/products/variants
- Required provisional commerce setting
- Required provisional assessment template/sections/questions/options/rules

Not seeded:

- Test users
- Admin passwords
- Test addresses
- Test carts
- Test orders
- QA coupons
- Submitted assessments
- Recommendation data
- Development audit history

