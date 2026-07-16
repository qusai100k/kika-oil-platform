# Kika Oil Platform

Phase 1 foundation for an Arabic-first, RTL skincare commerce and guided-product platform. This repository is a professional prototype: all product names, prices, ingredients, contact details, and brand assets are demo/unverified.

## Run locally

1. Install Node.js 20.9+ and PostgreSQL.
2. Copy `.env.example` to `.env` and replace `DATABASE_URL` with valid local credentials.
3. Run `npm install`.
4. Run `npm run prisma:generate`.
5. Optional database setup: `npm run db:migrate -- --name phase1_initial`, then `npm run db:seed`.
6. Run `npm run dev` and open `http://localhost:3000`.

## Quality commands

```text
npm run lint
npm run typecheck
npm run prisma:format
npm run prisma:validate
npm run build
```

## Phase boundary

Implemented: layout, design system, public demonstration pages, reusable components, schema/auth foundations, and safe demo seed definitions.

Not implemented: real authentication, cart/checkout, orders, payments, assessment questionnaire, recommendation engine, AI, booking, admin operations, or verified commercial/medical content.

See `docs/LOCAL_DEVELOPMENT_GUIDE.md` and `docs/PHASE_1_IMPLEMENTATION_REPORT.md`.

