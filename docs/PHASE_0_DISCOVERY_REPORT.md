# Phase 0 Discovery Report

## Status legend

- **Brief-known:** stated in the project brief, not yet owner-approved.
- **Assumption:** used only to structure discovery.
- **Recommended default:** professional recommendation pending approval.
- **Owner decision / Specialist review / Legal review:** explicit approval is required.

## Executive summary

Kika Oil Platform is intended to move an Instagram-led skincare-oil business toward an Arabic-first storefront, controlled product guidance, and eventually human consultation and AI assistance. No operating country, catalog, formulation model, payment, shipping, legal policy, safety rule, specialist, budget, or launch scope is confirmed.

The provisional recommendation is **MVP Option C (Commerce + Guided Recommendation)**, delivered incrementally through Options A and B. This best tests the differentiating business value while keeping unrestricted AI out. It is viable only after product content and deterministic safety rules are professionally approved. If those inputs cannot be supplied, launch Option A or B first.

The provisional product-model default is **Scenario 2 (standard products with controlled variants)** because it supports commerce without the operational and safety complexity of individual formulas. Scenario 1 is safer if variants do not exist. Scenarios 3–4 remain blocked until the owner documents formulation, traceability, pricing, approval, and reorder processes.

## Discovery findings

### Brief-known, not formally confirmed

- Arabic-first, RTL web platform; Instagram is a major current channel.
- The apparent product category is skincare oils.
- Customers currently describe skin type/concerns and receive a recommendation or prepared oil.
- Long-term capabilities include commerce, assessment, recommendations, consultations, administration, and analytics.
- The platform must not diagnose, prescribe, promise cures, or use facial image diagnosis.

### Current assumptions

- Web is the first delivery surface.
- Product and medical/safety content has not been verified.
- One business and one primary currency are expected initially.
- Human escalation is preferable before conversational AI.

### Recommended defaults

- Modular monolith; Arabic-first with i18n-ready content.
- Deterministic, versioned recommendation rules with a safe no-recommendation outcome.
- Least-privilege server-side authorization and explicit consent to share assessment data.
- Controlled beta after security, recovery, accessibility, and content approval gates.

## Phase 1 blockers

1. Owner selects provisional MVP option and target release boundary.
2. Operating/selling country, primary currency, tax assumptions, and initial shipping scope.
3. Product business model: pre-made, variants, personalized, or hybrid.
4. Minimum catalog structure and whether only clearly marked demo data may be used.
5. Brand name/identity status and permission to use supplied assets.
6. Account ownership, hosting constraints, budget range, and target timeline.
7. Decision whether Phase 1 schema is foundation-only or must anticipate commerce/custom formulation.
8. Named owners for business content, safety review, privacy/legal review, and technical accounts.

Payment provider, detailed shipping, and final policies can remain later-phase blockers, but country and business model cannot.

## Deliverables

This package defines requirements, roles, journeys, MVP and product-model options, assessment/recommendation/consultation/commerce workflows, bilingual owner questionnaires, decision register, traceability matrix, and acceptance checklist.

## Recommendation and next action

Run the Arabic owner interview, record answers in `DECISION_REGISTER.md`, and hold a short follow-up with the safety specialist and legal/privacy reviewer. Phase 1 should start only when all items marked “Before Phase 1” have an approved answer or an explicitly accepted deferral that does not affect foundation design.

