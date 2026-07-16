# Kika Oil Platform — Release Notes

These notes summarize the business-facing outcome of each prototype release. They do not imply commercial launch approval or activation of future-phase services.

## v0.7.0 — Deterministic Product Recommendation Engine

Released: 2026-07-17
Status: Develop Preview release candidate only; not promoted to Production.

Phase 7 connects completed structured skin assessments to a deterministic, rules-based product guidance engine. Customers with an eligible assessment can generate a transparent product recommendation, review why products were selected, view alternatives, open product details, and intentionally add a recommended item to the cart.

The release deliberately does not add AI product selection, chatbot behavior, specialist booking, medical diagnosis, or treatment claims. Recommendation wording is controlled, provisional, and limited to non-medical product guidance until the business owner and qualified reviewer approve final product mappings, ingredient restrictions, and explanation copy.

### Operational highlights

- Admins can review recommendation configuration versions, product readiness, and recommendation run summaries.
- Published recommendation configs are immutable; changes start as draft versions.
- The engine stores assessment/config/product snapshots to preserve what was used for each result.
- No-result, insufficient-data, and safety-withheld states are supported when a recommendation should not be shown.

### Known limitations

- The seeded product mappings and explanation templates remain development-only and require approval.
- Recommendations are deterministic and rule-based only; Phase 8+ services are still absent.
- Production was not modified and `main` was not merged.

## v0.6.0 — Structured Skin Assessment

Released: 2026-07-16
Status: Develop Preview only.

Customers can consent, create and resume a structured draft, review answers, submit an immutable record, and receive a cautious deterministic state. No product is recommended in this release. Questions and safety rules are development drafts awaiting owner, specialist, privacy, and legal approval.

Closure verification completed referral, needs-more-information correction, logout/login resume, cross-user access, stale-tab, sensitive admin view, template versioning, and responsive admin checks.

## v0.5.0 — Store Operations Dashboard

Released: 2026-07-16
Status: Develop Preview only; not promoted to Production.

Authorized staff can operate the development store through a responsive Arabic dashboard. Role boundaries separate content and order work, while server checks protect every mutation. The release adds catalog and variant management, controlled stock adjustments, order progression, one-time manual transfer confirmation, coupon administration, privacy-conscious customer summaries, review moderation, structured content, provisional settings, audit review, and real database analytics.

Durable image hosting and approved commercial settings remain pending. No AI, recommendation, specialist booking, or real payment integration was added.

## v0.4.0 — Commerce Foundation

Released: 2026-07-16  
Status: Develop Preview only; not promoted to Production.

Authenticated customers can build a persistent cart, select an owned delivery address, apply development coupons, review server-calculated totals, choose provisional cash-on-delivery or manual transfer, create an order, review its immutable record, and cancel before fulfillment.

PostgreSQL transactions conditionally decrement variant stock and restore it once on cancellation. Currency `XXX`, shipping `25`, payment availability, products, stock, and coupons are explicitly development data awaiting business approval.

## v0.3.0 — Secure Customer Accounts

Released: 2026-07-16  
Status: Available on the protected `develop` Preview; not promoted to Production.

Customers can create an account, sign in securely, sign out, request password recovery, manage profile details, save delivery addresses, and access protected account areas. Authentication is backed by Better Auth and an isolated Neon development database.

Known limitations: email delivery, advanced device-session management, and verified email-change flows require later approval and implementation.

## v0.2.0 — Premium Storefront and Client Presentation

Released: 2026-07-16  
Status: Client prototype release.

Introduced a premium Arabic RTL skincare storefront with home, catalog, product-detail, brand, FAQ, contact, policy, and skin-guide experiences. The release also added responsive product discovery, client-presentation messaging, and polished Coming Soon treatments for planned services.

Known limitations: product details, prices, ingredients, brand assets, policies, logistics, and commercial settings still require final business approval.

## v0.1.0 — Discovery and Technical Foundation

Released: 2026-07-16  
Status: Internal foundation release.

Completed structured discovery and established the production-oriented Next.js, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS, ESLint, and Vitest foundation. The initial data model covered customers, products, orders, assessments, recommendations, consultations, consent, notifications, and audit events.

Known limitations: authentication, commerce, assessments, recommendations, consultation booking, and admin tooling remained inactive by design.
