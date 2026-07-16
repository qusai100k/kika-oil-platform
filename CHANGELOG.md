# Changelog

All notable changes to the Kika Oil Platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Project policy

- Every future phase must update this section as part of its implementation commit.
- A phase cannot be marked complete until its changes are categorized under Added, Changed, Fixed, Security, Deprecated, or Removed.
- When a release is approved, move Unreleased entries into a dated semantic version and update `RELEASE_NOTES.md` and `package.json` together.

## [0.4.0] - 2026-07-16

### Added

- Persistent authenticated cart with add, merge, quantity update, remove, clear, server totals, and header count.
- Structured checkout with owned address selection, demo shipping, coupon validation, provisional COD/manual-transfer methods, and review totals.
- Transactional order creation, immutable item/address/coupon/shipping snapshots, idempotency keys, status history, notifications, and audit events.
- Fixed and percentage coupons with dates, minimum spend, caps, total limits, and per-customer limits.
- Atomic variant stock decrement, inventory movements, overselling protection, eligible cancellation, and idempotent stock restoration.
- Order confirmation, customer order history, secure details, timeline, and cancellation UI.
- Development-only products, stock states, coupons, and commerce settings.

### Changed

- Activated the account Orders section and updated the project version to `0.4.0`.
- Replaced the cart presentation placeholder with the Phase 4 commerce experience.
- Marked currency, shipping, COD, and transfer behavior as provisional throughout the UI and documentation.

### Security

- Enforced cart, address, and order ownership on every server mutation and lookup.
- Recalculated price, stock, discounts, shipping, and totals exclusively on the server.
- Used serializable PostgreSQL transactions and conditional stock updates to prevent overselling.
- Added safe order-reference validation, duplicate-submission protection, and cancellation state checks.

## [0.3.0] - 2026-07-16

### Added

- Phase 3 authentication using Better Auth 1.6.23, Prisma, and an isolated Neon PostgreSQL database.
- Arabic RTL registration, login, logout, password recovery, and password-reset experiences.
- Protected customer account overview, profile, addresses, and security pages.
- Saved-address creation, default selection, ownership enforcement, and deletion confirmation.
- Protected placeholders for orders, skin assessments, recommendations, consultations, and notification preferences.
- Provider-neutral email transport architecture for verification, recovery, welcome, and security messages.
- Authentication and account audit events, rate-limit protection, secure session cookies, and safe redirect handling.
- Phase 3 architecture, user guide, authorization matrix, environment, acceptance, implementation, and test documentation.

### Changed

- Updated the Prisma authentication models to Better Auth's adapter contract.
- Extended address records with optional building/unit and delivery-note fields.
- Changed the header account destination according to authentication state.
- Scoped Neon and authentication secrets exclusively to Vercel Preview and Development environments.
- Set the project version to `0.3.0`.

### Security

- Public registration always assigns the `CUSTOMER` role server-side.
- Protected reads and mutations derive identity from the server session.
- Address mutations enforce resource ownership to reduce IDOR risk.
- Password-reset completion revokes existing sessions; password changes can revoke other sessions.
- Reset and verification tokens are never exposed in Preview or public UI.

## [0.2.0] - 2026-07-16

### Added

- Phase 2 premium Arabic RTL storefront covering home, products, product details, about, FAQ, contact, policies, and skin guide experiences.
- Responsive catalog search, filtering, sorting, breadcrumbs, product cards, and reusable presentation components.
- Client presentation page explaining the platform vision, customer journey, operational value, and planned services.
- Premium Coming Soon treatments for the AI Skin Assistant, specialist consultations, customer dashboard, and smart recommendations.
- Client proposal deliverables and presentation-readiness documentation.
- End-to-end QA, client-presentation, accessibility, SEO, responsive, and production-readiness reports.

### Changed

- Refined Arabic copywriting, typography, hierarchy, spacing, color system, imagery, buttons, cards, and mobile navigation.
- Added subtle page, section, image, card, and button transitions with reduced-motion support.
- Reworked placeholder and demo copy so planned functionality is clearly distinguished from implemented functionality.
- Prepared and deployed the approved client prototype to Vercel production.

### Fixed

- Resolved responsive overflow, touch-target, keyboard-focus, heading, metadata, structured-data, sitemap, robots, hydration, and build issues found during QA.
- Hardened the Next.js production build and Prisma client generation for Vercel.

## [0.1.0] - 2026-07-16

### Added

- Phase 0 discovery package: business requirements, stakeholder questions, risks, open decisions, scope, acceptance criteria, and traceability documentation.
- Phase 1 Next.js, TypeScript, React, Tailwind CSS, Prisma, PostgreSQL, ESLint, and Vitest project foundation.
- Initial domain architecture, folder structure, environment validation, database schema, seed foundation, roles, and authorization boundary.
- Initial design tokens, shared UI primitives, layouts, loading/error/empty states, and Arabic RTL foundation.
- Product, catalog, assessment, recommendation, consultation, order, consent, notification, and audit domain models prepared for phased implementation.

### Changed

- Converted discovery decisions into a production-oriented architecture and phased delivery roadmap.
- Established provider-neutral boundaries for authentication, email, storage, payment, and future AI services.

### Security

- Added environment-variable boundaries, server-only database access, role definitions, ownership helpers, and audit-log schema foundations.

[Unreleased]: https://github.com/qusai100k/kika-oil-platform/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/qusai100k/kika-oil-platform/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/qusai100k/kika-oil-platform/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/qusai100k/kika-oil-platform/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/qusai100k/kika-oil-platform/releases/tag/v0.1.0
