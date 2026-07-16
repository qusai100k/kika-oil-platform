# Phase 6 Browser QA Matrix

Executed on Vercel Preview on 2026-07-16.

| Flow | Result | Evidence |
|---|---|---|
| Consent unselected / decline | Pass | Browser stayed on consent page until explicit consent was selected. |
| Consent accept / owned draft | Pass | Opaque UUID draft created; answers were not present in URL. |
| Save, logout, login, resume | Pass | Draft resumed with saved answer and progress after re-authentication. |
| Section wizard | Pass | RTL 8-step wizard rendered, required validation focused the first missing field, and next-step focus moved to the heading. |
| Conditional show/hide | Pass | Dependent allergy/details questions appeared immediately and hidden answers were cleaned when the parent changed. |
| READY path | Pass | Submitted review returned `READY_FOR_FUTURE_RECOMMENDATION` with safe non-diagnostic wording. |
| Referral path | Pass | Severe-condition route returned referral wording without diagnosis, treatment, product, or oil recommendation. |
| Needs-more-information correction | Pass | Same assessment reopened from `NEEDS_MORE_INFORMATION` to `DRAFT`, routed to the relevant section, preserved revision 1, and resubmitted as ready. |
| Immutable submitted result | Pass | Direct edit route for a submitted assessment redirected back to result/read-only state. |
| Draft deletion confirmation | Pass | Dialog used modal semantics, initial focus, Escape close, and focus return. |
| User A/B IDOR | Pass | Cross-user read, result, save, and delete attempts were hidden or rejected without mutation. |
| Two-tab stale update | Pass | Older save was rejected with the stale notice and the newer server answer remained intact. |
| Admin template operations | Pass | Duplicate, validate, publish/immutability, archive, section/question/option/rule edits, and permission denial were verified on development data. |
| Sensitive admin view | Pass | Sensitive view displayed warning and structured answers; audit event omitted answer contents. |
| ORDER_MANAGER boundary | Pass | `ORDER_MANAGER` could not access or mutate assessment administration. |
| Responsive matrix | Pass after fix | 48 checks across 320, 375, 390, 768, 1024, 1280, 1440, and 1920 widths. Admin mobile overflow was fixed and rechecked. |
| Console / production logs | Pass with note | No application error appeared in Vercel logs during final clean checks; pg SSL warning remains a dependency warning. |

## Viewports Covered

- 320 x 568
- 375 x 667
- 390 x 844
- 768 x 1024
- 1024 x 768
- 1280 x 800
- 1440 x 900
- 1920 x 1080

## Pages Covered

- `/skin-assessment/start`
- `/skin-assessment/[assessmentId]`
- `/skin-assessment/[assessmentId]/review`
- `/skin-assessment/[assessmentId]/result`
- `/account/assessments`
- `/admin/assessments/templates`
- `/admin/assessments/[assessmentId]`
