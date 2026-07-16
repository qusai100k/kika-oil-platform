# Controlled Recommendation Workflow

> Draft safety design. Rules and customer wording require specialist approval; legal/privacy text requires legal review.

## Inputs

Assessment answers/version, customer eligibility/consent, approved product and variant attributes, ingredients/allergens, incompatibilities, contraindications, stock/availability, preference weights, and published ruleset version.

## Flow

1. Collect structured answers and consent.
2. Validate types, required fields, allowed values, and version availability.
3. Return targeted missing-information prompts; never infer critical answers.
4. Apply eligibility and safety-stop exclusions.
5. Apply known allergy, ingredient, contraindication, prescription, and approved interaction exclusions.
6. Evaluate referral rules before matching.
7. Filter to published, available, approved products.
8. Rank only safe candidates using documented compatibility and preference weights.
9. Produce structured, explainable result with rule/product versions.
10. Render only approved reason, use, warning, and limitation text.
11. Offer human consultation or approved support route.
12. Store result, versions, decision codes, and audit metadata under retention policy.

## Outputs

- `RECOMMENDATION`: primary and optional alternative, cautious strength, reasons, use guidance, warnings.
- `NEEDS_INFORMATION`: missing fields and safe next action.
- `REFERRAL`: approved reason category and route; no product where the rule prohibits it.
- `NO_RECOMMENDATION`: no safe/in-stock match or insufficient approved evidence.
- `SYSTEM_UNAVAILABLE`: no guessed result; safe retry/contact message.

## Business and safety rules

- Safety exclusions always outrank product preference, margin, popularity, and stock.
- Unknown allergy/medicine/high-risk answers may reduce scope or force referral as professionally approved.
- The system never invents product benefits, diagnoses, medication advice, or cure claims.
- Out-of-stock products are not primary recommendations; approved alternatives must independently pass all rules.
- Personalized formulas are never generated automatically unless a separately approved controlled formulation process exists.

## Responsibilities

- **Admin/content:** maintain sourced product facts; cannot approve specialist-only safety content unless separately qualified.
- **Store Owner:** appoint approvers, control publication, resolve operations, and accept business rules.
- **Specialist:** approve questionnaire wording, exclusions, mappings, referral logic, test cases, and review cadence.
- **Legal/privacy reviewer:** approve disclosures, consent, claims boundaries, retention, and referral wording for jurisdiction.

## Versioning and audit

Immutable published versions for questionnaire, product facts relevant to decision, rules, reason/warning text, and result schema. Record publication/retirement, approver, timestamps, test evidence, and per-result version IDs. Do not log raw sensitive answers in ordinary application logs.

## Failure states

Invalid/expired version, incomplete input, no consent, no safe candidate, unpublished product data, rule conflict, provider/database outage, and unauthorized access. Every state fails closed and gives a non-diagnostic next action.

