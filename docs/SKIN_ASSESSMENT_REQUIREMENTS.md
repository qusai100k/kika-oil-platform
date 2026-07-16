# Skin Assessment Requirements

> **Draft only — specialist and legal/privacy review required.** These are business-level prompts, not final Arabic medical wording and not diagnostic questions.

## Questionnaire structure

Answer types: single choice (SC), multi-choice (MC), short text (ST), boolean (YN), consent (C). “Referral” means an answer may activate an approved screening rule; it does not itself diagnose.

| Code | Category / draft question concept | Purpose | Type | Req. | Sensitive | Referral | Specialist approval | MVP C |
|---|---|---|---|---|---|---|---|---|
| Q01 | Basic profile: age band | Apply eligibility/vulnerability rules | SC | Yes | Yes | Yes | Yes | Yes |
| Q02 | Basic profile: country/region if safety or fulfillment needs it | Apply available service/policy | SC | Conditional | Yes | No | Legal | No |
| Q03 | Skin type as the customer currently understands it | Compatibility input, not diagnosis | SC + unsure | Yes | Yes | No | Yes | Yes |
| Q04 | Main concerns the customer wants help with | Match approved concern tags | MC | Yes | Yes | Possible | Yes | Yes |
| Q05 | Concern duration/severity in simple non-diagnostic bands | Identify persistent/severe cases | SC | Yes | Yes | Yes | Yes | Yes |
| Q06 | Current sensitivity/reactivity level | Compatibility and caution | SC + unsure | Yes | Yes | Yes | Yes | Yes |
| Q07 | Known allergies, especially cosmetic ingredients | Hard exclusion input | MC/ST | Yes | Yes | Yes | Yes | Yes |
| Q08 | Previous unwanted reactions to skincare | Exclusion/referral context | YN + structured follow-up | Yes | Yes | Yes | Yes | Yes |
| Q09 | Current routine product categories | Avoid unsuitable routine complexity | MC | Should | Yes | Possible | Yes | Yes |
| Q10 | Active ingredients currently used | Detect approved incompatibilities | MC + unsure | Yes | Yes | Yes | Yes | Yes |
| Q11 | Prescription skincare/dermatology medicine use | Mandatory referral or restriction per rule | YN + prefer not to say | Yes | Yes | Yes | Yes | Yes |
| Q12 | Pregnancy or breastfeeding where relevant | Ingredient caution/referral | SC + not applicable/prefer not | Conditional | Yes | Yes | Yes + legal | Yes if relevant |
| Q13 | Primary goals | Rank compatible products | MC | Yes | Yes | No | Yes | Yes |
| Q14 | Texture/scent preferences and fragrance avoidance | Preference ranking, never override safety | MC | No | Low | No | Product expert | Yes |
| Q15 | Routine complexity/frequency preference | Fit approved usage pattern | SC | No | Low | No | Product expert | Yes |
| Q16 | Open wounds, serious reaction, suspected infection, or rapidly worsening issue (carefully worded) | Stop guidance and refer | MC/YN | Yes | Yes | Yes | Yes + legal | Yes |
| Q17 | Known serious skin condition | Stop/limit guidance | YN + prefer not | Yes | Yes | Yes | Yes | Yes |
| Q18 | Any uncertainty or other safety information | Safe no-result/human review | ST + none | No | Yes | Possible | Yes | Yes |
| Q19 | Consent to process answers for guidance | Lawful/transparent processing | C | Yes | Yes | N/A | Legal | Yes |
| Q20 | Optional consent to share selected result with a specialist | Control consultation sharing | C | No | Yes | N/A | Legal | If booking included |
| Q21 | Optional marketing/research consent, separate from service | Prevent bundled consent | C | No | Yes | N/A | Legal | No |

## Requirements

- Questions, options, help text, referral effects, and consent text are versioned and publishable only by authorized roles.
- “Unsure” and “prefer not to say” are supported where appropriate; the engine may return no recommendation.
- Free text is minimized and never interpreted as a diagnosis.
- The customer sees purpose, limits, data use, retention summary, and withdrawal consequences before submission.
- Draft answers expire under an approved period; submitted versions remain reproducible subject to retention/deletion policy.
- MVP C cannot launch until specialist-approved wording, answer mappings, exclusions, referral cases, and test cases exist.

