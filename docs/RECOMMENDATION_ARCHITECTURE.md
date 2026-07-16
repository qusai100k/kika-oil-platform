# Recommendation Architecture

The Phase 7 engine follows a controlled deterministic flow:

Submitted assessment -> eligibility -> structured profile -> product readiness -> hard exclusions -> scoring -> ranking -> deterministic explanations -> immutable snapshot -> customer presentation.

The implementation is split across:

- `src/server/recommendation/eligibility.ts`
- `src/server/recommendation/profile.ts`
- `src/server/recommendation/readiness.ts`
- `src/server/recommendation/exclusions.ts`
- `src/server/recommendation/scoring.ts`
- `src/server/recommendation/explanations.ts`
- `src/server/recommendation/service.ts`

All recommendation decisions run server-side. Client code cannot submit scores, eligibility, rankings, or trusted product IDs.
