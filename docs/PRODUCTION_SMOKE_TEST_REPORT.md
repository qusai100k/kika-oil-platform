# Production Smoke Test Report

Release: v0.6.0

## Pre-merge checks

- `npm install`: passed
- `npm run lint`: passed
- `npm run typecheck`: passed after clearing stale `.next` artifacts from a previous Phase 7 checkout
- `npm test`: passed, 123 tests
- `npx prisma format`: passed
- `npx prisma validate`: passed
- `npx prisma generate`: passed
- `npm run build`: passed, 56 routes generated

## Database checks

Production migration status: up to date.

Production seeded counts after cleanup:

- Users: 0
- Orders: 0
- Coupons: 0
- Assessments: 0
- Carts: 0
- Addresses: 0
- Products: 5
- Variants: 5
- Assessment templates: 1
- Assessment questions: 24
- Assessment rules: 5
- Site settings: 1

## Production smoke test status

Completed on 2026-07-17 against:

https://kika-oil-platform.vercel.app

Deployment ID: `dpl_6YFZVwt8k7Eh8jeDcDYobGWG243M`

Results:

- Public pages: passed by HTTP smoke.
- Registration: passed with a temporary smoke account.
- Customer account redirect/session: passed after registration.
- Address creation: passed.
- Cart add flow: passed.
- Checkout with provisional COD: passed.
- Order placement: passed with order `KIKA-260716-A948`.
- Order detail: passed.
- Eligible cancellation: passed.
- Structured assessment consent/start: passed; draft route was created successfully.
- Admin route protection: passed; customer was redirected to `/account?notice=admin-forbidden`.
- Production cleanup: passed; smoke user, address, cart, order, and draft assessment were deleted.

After cleanup, Production retained:

- Users: 0
- Orders: 0
- Coupons: 0
- Assessments: 0
- Carts: 0
- Addresses: 0
- Products: 5
- Assessment templates: 1
