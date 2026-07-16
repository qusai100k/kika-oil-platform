# Product Business Model Scenarios

## Scenario comparison

| Area | 1 — Standard pre-made | 2 — Controlled variants | 3 — Personalized formula | 4 — Hybrid |
|---|---|---|---|---|
| Required data | Fixed SKU, ingredients, size, price, stock, lot/shelf-life as needed | Product plus variant attributes/SKU/price/stock and allowed combinations | Customer-approved formula, component quantities, lot provenance, approver, price, preparation/shelf-life | Both models plus eligibility and routing rules |
| Order flow | Select SKU → pay → fulfill | Select valid variant → validate → fulfill | Assessment/review → approve formula/quote → consent → prepare → QC → fulfill | Standard path or gated custom path |
| Stock | Finished goods | Finished goods per variant | Ingredient/component stock and yield; possibly packaging | Both, with stronger reconciliation |
| Recommendation | Match fixed products | Match product then eligible variant | Guidance cannot safely auto-create formula; human-controlled formulation | Match standard first; route eligible cases to custom review |
| Reorder | Revalidate current SKU/price/stock | Revalidate variant | Revalidate formula version, suitability, ingredients, consent, expiry | Path-specific |
| Safety | Lowest relative complexity | Variant-specific allergens/strength may differ | Highest: dosage, interactions, traceability, contamination, vulnerable users | High due to two pathways |
| Database | Product/SKU/content/snapshot | Product + variant/options/combination constraints | Formula/version/components/quantities/approval/QC/batch/customer linkage | Union with explicit order-item type |
| Admin | Catalog and stock | Variant matrix, stock and content | Formula review, quote, component inventory, QC, audit | Both workflows and permissions |
| Specialist approval | Possibly content/rules | Likely for safety-sensitive variants | Usually required; exact role needs legal/specialist review | Required for custom path; possibly rules for standard path |
| Relative complexity | Low | Medium | High | High |

## Recommendation matrix

| Business condition | Suitable scenario |
|---|---|
| Every bottle is identical within an SKU | 1 |
| Customer chooses only controlled size/type/scent/strength | 2 |
| Ingredient quantities change per customer | 3 |
| Standard catalog plus exceptional custom preparation | 4 |
| Owner cannot provide traceability/approval records for custom formulas | Do not launch 3 or 4 |

## Provisional recommendation

Use **Scenario 2** as the planning default, falling back to Scenario 1 if no true variants exist. It preserves normal commerce semantics while allowing controlled choice. Do not finalize the schema or represent personalized mixtures as ordinary variants until the owner explains the real process and qualified/legal reviewers approve its safety and recordkeeping.

