# Kika Oil Platform Deployment Report

## Deployment summary

- **Platform:** Vercel
- **Deployment date:** 2026-07-16
- **Production URL:** https://kika-oil-platform.vercel.app
- **GitHub repository:** https://github.com/qusai100k/kika-oil-platform
- **Production status:** Public and operational

## Build configuration

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Node.js 24.x
- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Output:** Vercel-managed Next.js output
- **Production branch:** `main`
- **Rendering:** Static generation for the public storefront and product pages

## Environment variables

| Variable | Environment | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical production URL used by metadata, sitemap, and public links |

`DATABASE_URL` is not configured in production because the current presentation prototype does not execute database-backed features. It becomes required when accounts, ordering, consultations, or administration are activated.

## Production verification

The Vercel production build completed successfully and generated 25 static routes, including all six product pages, metadata endpoints, `robots.txt`, and `sitemap.xml`.

The following public routes were verified after deployment:

- Home
- Presentation
- Products
- Product details
- About
- Skin guide
- FAQ
- Contact

## Known production limitations

- Product names, prices, sizes, ingredients, and imagery remain presentation content pending business approval.
- Contact form submission is intentionally not connected to an email or CRM provider.
- Accounts, cart, checkout, payment, shipping, consultations, AI guidance, and administration remain future phases.
- Policy pages are presentation drafts and require commercial and legal approval before a transactional launch.
- No production database is connected because the deployed prototype uses static storefront data only.
- The current Vercel project was published with the official Vercel CLI. The GitHub repository is the source of record, but automatic deployment on every GitHub push requires installing the Vercel GitHub App for this repository.
- `npm audit` reports moderate advisories inherited through the current Next.js/PostCSS and Prisma tooling dependency trees. No compatible non-breaking remediation is currently offered by npm; forced remediation would downgrade core frameworks and was therefore not applied.

## v0.6.0 Production release update

- **Release date:** 2026-07-17
- **Scope:** Completed Phases 3 through 6 promoted from `release/v0.6.0-rc` to `main`.
- **Production deployment ID:** `dpl_6YFZVwt8k7Eh8jeDcDYobGWG243M`
- **Merge commit:** `d592eed`
- **Release documentation commit:** `3768945`
- **Backup branch:** `backup/pre-v0.6.0-production`
- **Production database:** Neon PostgreSQL database `kika_oil_production`, separate from Development database `neondb`.
- **Production environment variables:** `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`.
- **Seeded categories:** required catalog products/variants, provisional commerce setting, provisional assessment template/questions/rules.
- **Not copied:** Development users, QA orders, carts, addresses, submitted assessments, admin passwords, coupons, and audit history.
- **Phase 7 status:** Not included in Production.
