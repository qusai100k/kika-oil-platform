# Phase 7 Acceptance Checklist

- [x] Eligible submitted assessments can generate recommendations.
- [x] Referral and unresolved assessments are blocked by eligibility.
- [x] Hard exclusions, allergy exclusions, skin-type incompatibility, inactive/unavailable product handling, and readiness exclusions are implemented.
- [x] Deterministic scoring, ranking, tie-breaking, primary and alternatives are implemented.
- [x] No forced recommendation when eligible evidence is insufficient.
- [x] Explanations are deterministic and avoid diagnosis/treatment claims.
- [x] Immutable recommendation snapshots store config version, profile, exclusions, score, ranking, product, and explanation snapshots.
- [x] Duplicate generation is guarded by idempotency and existing generated recommendation reuse.
- [x] Recommendation history and detail pages exist.
- [x] Ownership is enforced for customer recommendation reads and add-to-cart.
- [x] Admin configuration and product readiness workflows exist.
- [x] Published configuration is not edited in place; new work starts from a draft duplicate.
- [x] ORDER_MANAGER has no recommendation permission.
- [x] Add-to-cart uses existing secure cart validation.
- [x] Tests, migration, seed, and build pass locally.
- [ ] Final Vercel Preview browser QA after push.
- [ ] Owner and specialist approval of product mappings, rules, ingredients, safety wording, and final commercial settings.
