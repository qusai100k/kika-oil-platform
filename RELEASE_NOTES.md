# Kika Oil Platform — Release Notes

These notes summarize the business-facing outcome of each prototype release. They do not imply commercial launch approval or activation of future-phase services.

## v0.6.0 — Structured Skin Assessment

Released: 2026-07-16
Production promotion: 2026-07-17.
Status: Released to the public Production URL with a dedicated Production database.

Customers can consent, create and resume a structured draft, review answers, submit an immutable record, and receive a cautious deterministic state. No product is recommended. Questions and safety rules are development drafts awaiting owner, specialist, privacy, and legal approval. AI, diagnosis, booking, and Phase 7 are absent.

Closure verification completed the referral, needs-more-information correction, logout/login resume, cross-user access, stale-tab, sensitive admin view, template versioning, and responsive admin checks. The Preview now includes fixes for correction routing, mobile overflow, and reliable template duplication on Neon.

## v0.5.0 — Store Operations Dashboard

Released: 2026-07-16
Status: Develop Preview only; not promoted to Production.

Authorized staff can operate the development store through a responsive Arabic dashboard. Role boundaries separate content and order work, while server checks protect every mutation. The release adds catalog and variant management, controlled stock adjustments, order progression, one-time manual transfer confirmation, coupon administration, privacy-conscious customer summaries, review moderation, structured content, provisional settings, audit review, and real database analytics. Durable image hosting and approved commercial settings remain pending; no AI, skin assessment, recommendation, specialist booking, or real payment integration was added.

## v0.4.0 — Commerce Foundation

Released: 2026-07-16  
Status: Develop Preview only; not promoted to Production.

Authenticated customers can now build a persistent cart, select an owned delivery address, apply development coupons, review server-calculated totals, choose provisional cash-on-delivery or manual transfer, create an order, review its immutable record, and cancel before fulfillment. PostgreSQL transactions conditionally decrement variant stock and restore it once on cancellation. Currency `XXX`, shipping `25`, payment availability, products, stock, and coupons are explicitly development data awaiting business approval. No real payment provider, bank details, refund processing, admin dashboard, AI, or specialist booking was added.

## v0.3.0 — Secure Customer Accounts

Released: 2026-07-16  
Status: Available on the protected `develop` Preview; not promoted to Production.

### Highlights

- Customers can create an account, sign in securely, sign out, and request password recovery.
- A polished Arabic account area now supports profile details, phone number, saved addresses, and account security.
- Customers can store multiple delivery addresses, choose a default, and delete an address with confirmation.
- Future account areas for orders, skin assessments, recommendations, and consultations are presented honestly as planned services.
- Authentication is backed by Better Auth and an isolated Neon development database.

### Security and operations

- New accounts receive the Customer role only.
- Sessions use secure server-managed cookies, authentication endpoints are rate limited, and protected mutations enforce ownership.
- Development and Preview credentials are isolated from Production.
- Password recovery is fully structured, but external email delivery remains pending provider and sender-domain approval.

### Known limitations

- Email delivery, advanced device-session management, and verified email-change flows require later approval and implementation.
- Phase 4 commerce functionality has not started.

## v0.2.0 — Premium Storefront and Client Presentation

Released: 2026-07-16  
Status: Client prototype release.

### Highlights

- Introduced a premium Arabic RTL skincare storefront with a cohesive white, beige, cocoa, and gold visual identity.
- Delivered the home, catalog, product-detail, brand, FAQ, contact, policy, and skin-guide experiences.
- Added responsive product discovery through search, filters, sorting, cards, breadcrumbs, and detailed product information.
- Added a presentation experience that explains why the platform improves on unstructured Instagram-message workflows.
- Presented future AI assistance, specialist consultation, dashboard, and recommendation concepts without suggesting they are already active.

### Quality improvements

- Completed comprehensive visual, responsive, accessibility, SEO, metadata, navigation, hydration, and production-build reviews.
- Improved Arabic copy, typography, spacing, touch targets, keyboard focus, responsive behavior, loading states, and reduced-motion support.
- Replaced unfinished-looking areas with intentional and transparent presentation states.

### Known limitations

- Product details, prices, ingredients, brand assets, policies, logistics, and commercial settings still require final business approval.
- Authentication and customer accounts were scheduled for v0.3.0.

## v0.1.0 — Discovery and Technical Foundation

Released: 2026-07-16  
Status: Internal foundation release.

### Highlights

- Completed structured discovery covering business goals, customer journeys, stakeholders, risks, open questions, and approval gates.
- Established the phased roadmap and requirements traceability model.
- Created the production-oriented Next.js, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS, ESLint, and Vitest foundation.
- Designed the initial data model for customers, products, orders, assessments, recommendations, consultations, consent, notifications, and audit events.
- Established Arabic RTL, reusable UI components, server-only database access, roles, and authorization foundations.

### Known limitations

- All brand and catalog content was provisional.
- Authentication, commerce, assessments, recommendations, consultation booking, and admin tooling remained inactive by design.
