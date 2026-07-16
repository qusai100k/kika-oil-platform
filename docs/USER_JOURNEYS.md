# User Journeys

All policy-dependent steps are draft. “Notify” means an owner-approved channel and template.

## Customer journeys

| Journey | Trigger & preconditions | Main flow | Alternative / error flow | Data collected | Notification & outcome |
|---|---|---|---|---|---|
| 1. Browse products | Visitor opens site; approved catalog exists | Browse/search/filter → open product → read variants, use, warnings, availability | Empty/no match; unavailable product; content error shows safe retry/contact | Search/filter telemetry only if permitted | None; informed view/contact/cart |
| 2. Contact business | Visitor needs help; approved channel exists | Choose WhatsApp/Instagram/contact → see purpose/privacy note → send externally or form | Channel unavailable; form validation/rate limit | Contact details/message only if form used | Receipt if form; support conversation starts |
| 3. Create account | Visitor chooses registration; identity method configured | Enter minimum identity → accept required terms → verify if required → profile created | Duplicate, weak credential, expired code, rate limit | Identity, credential verifier, policy consent | Verification/welcome; active or pending account |
| 4. Add to cart | Eligible product/variant available | Select valid option/quantity → server validates → add/update cart | Out of stock, stale price, invalid combination | Product/variant/quantity, cart ID | Inline status; valid cart |
| 5. Place order | Valid cart; checkout available | Sign in/guest decision → address → shipping → coupon → payment → review → submit → server revalidates and creates order | Stock/price changed, invalid coupon/address/payment, duplicate submit | Contact, address, items, totals, payment method, consents | Order confirmation/reference or recoverable failure |
| 6. Complete assessment | Eligible customer starts; version published | Read limits/consent → answer steps → save → validate → submit | Resume; withdraw; missing answer; safety answer stops normal flow | Profile bands, skin/routine/allergy/safety answers, consent/version | Completion/referral message; stored assessment |
| 7. Receive recommendation | Submitted safe assessment; approved rules/products | exclusions → match/rank → show reason, use, warnings, alternative/strength | Missing data asks follow-up; no safe match; engine failure | Assessment/rules/product versions, result/reasons | Result available; safe recommendation or no-result |
| 8. Referral | Screening/recommendation triggers approved rule | Stop product guidance as configured → explain boundary → offer specialist/appropriate help | No specialist available; urgent language follows approved policy; never claims emergency care | Referral code/category, not speculative diagnosis | Referral notice; no unsafe recommendation |
| 9. Book consultation | Verified specialist/slot; customer eligible | Select specialist/slot → share-data consent → payment if applicable → confirm | Slot taken, payment pending/fails, no availability | Slot/timezone, contact, consent scope, payment status, optional reason | Confirmation/reminders; booking created |
| 10. Track order | Customer has valid order access | Open history/reference → see approved status and tracking | Unknown/unauthorized reference; carrier unavailable | Access event, optional tracking query | Status view; support path if delayed |
| 11. Reorder | Prior eligible item exists | Select reorder → load current product → revalidate price/stock/safety/custom approval → cart | Retired/changed/out of stock; custom formula requires re-review | Prior item reference, new cart | Cart or explanation/review request |
| 12. Verified review | Delivered eligible order; review window open | Choose item → rating/comment/consent → submit moderation | Duplicate, abusive/sensitive content, validation failure | Rating, text, order-item link, display consent | Receipt; pending/published/rejected status |
| 13. Cancellation request | Order is within configured cancellable state | Select reason → show consequences → confirm → staff/automatic decision | Already prepared/shipped; duplicate; payment refund needed | Order, reason, request time | Request/decision/refund status |
| 14. Return/refund request | Delivered/paid order; policy eligibility | Select items/reason → evidence only if necessary → submit → staff review → return/refund | Ineligible/open/custom item, deadline passed, upload failure | Items, reason, minimal evidence, decision | Instructions and status; resolved request |
| 15. Data deletion | Authenticated customer or verified requester | Explain effects → verify identity → create request → review legal/operational holds → delete/anonymize → confirm | Cannot verify; active order/dispute; retention exception | Request, identity proof status, scope, decision/audit (not excess proof) | Receipt and completion/partial-retention explanation |

## Admin journeys

| Journey | Main flow | Controls / outcome |
|---|---|---|
| Add product | Create draft → enter SKU/variant/content/source → attach approved images → validate → approval/publish | Permission, duplicate checks, safety approval; auditable published product |
| Edit information | Open current version → edit draft → preview → approval → publish | Existing orders retain snapshot; revision logged |
| Update prices | Enter amount/currency/effective time → confirm → publish | Server validation; carts reprice transparently; audit |
| Update stock | Record reason and quantity/absolute correction → confirm | Concurrency control; adjustment ledger; low-stock signal |
| Review orders | Filter queue → open minimum details → act according to state | Sensitive fields restricted; access/actions audited |
| Confirm manual payment | Match evidence/reference → verify amount → confirm/reject | Separation threshold, no raw bank secrets; status notification |
| Update order status | Choose permitted next state → add operational reference → confirm | State machine prevents invalid transitions; customer notified |
| Manage recommendations | Draft questions/mappings/rules → specialist review → test cases → publish version/retire | No direct unversioned production edit; full audit |
| Assessment statistics | Choose approved aggregate/report → filter period | Minimum group-size/privacy rules; no unnecessary answer drill-down |
| Manage specialists | Invite → collect profile/evidence → independent verification → approve/suspend | Expiry/reverification and audit |
| Manage bookings | View queue → resolve schedule/payment/status → reschedule/cancel under policy | Consent boundaries; customer/specialist notified |
| Moderate reviews | Inspect → approve/reject/redact only by policy → record reason | Never fabricate/change sentiment; audit and appeal path |
| Manage content | Draft → preview Arabic/RTL → approve → schedule/publish | Legal/safety content uses required reviewer |
| Review audit logs | Search by actor/action/resource/time → inspect permitted metadata | Read-only ordinary access; sensitive payload excluded |
| Export data | Select approved dataset/fields/time → state purpose → generate expiring export | Permission, minimization, watermark/expiry where feasible, audit |
| Handle deletion | Verify request → locate records → apply holds → delete/anonymize/provider propagation → close | Dual review for high-impact action; evidence and customer notice |

## Specialist journeys

| Journey | Main flow | Controls / outcome |
|---|---|---|
| Create profile | Accept invitation → enter professional/public details → save draft | Not public until verified |
| Complete verification | Submit minimum evidence → independent reviewer validates/records expiry → approve/reject | Evidence access restricted; specialist cannot self-approve |
| Set availability | Set timezone, recurring windows, exceptions, buffers → publish | Conflict validation; bookable slots produced |
| Receive booking | System reserves slot → specialist sees assigned booking → acknowledges | Only minimum data before consent; reminders sent |
| Review customer information | Open booking → system checks active assignment and consent scope → view shared assessment | Access logged; no unrelated history |
| Conduct consultation | Join approved external channel → confirm attendance → follow professional process | Platform is not emergency service; meeting secrets protected |
| Add private notes | Enter relevant notes → save with restricted access | Never customer-visible by default; retention policy applies |
| Complete consultation | Mark outcome/status → optionally create approved customer summary/follow-up | Completion and summary notification |
| Reschedule/cancel | Choose policy reason/new slot → customer accepts if required | Slot released atomically; payment impact recorded |
| Review history | Filter own assigned completed bookings → view permitted records | No other specialist/customer access; retention limits |

