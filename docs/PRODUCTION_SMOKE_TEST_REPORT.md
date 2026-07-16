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

To be completed after Vercel Production deployment becomes Ready.

