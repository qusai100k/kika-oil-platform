# Commerce Workflows

High-level drafts only; country, tax, payment, shipping, and consumer policies remain open.

| Workflow | Draft happy path | Exceptions / controls |
|---|---|---|
| Cart | Add valid SKU/variant and quantity; show estimated totals | Revalidate stock/price; expiry policy; no custom formula before approval |
| Checkout | Identify customer → address → shipping → coupon → payment → review → submit | Server validation at each trust boundary; duplicate submission idempotent |
| Address | Collect minimum recipient/address fields for selected country | Validate country/zone; permit correction; restrict staff visibility |
| Shipping method | Present eligible methods, fee, estimate, constraints | No method → block with support path; estimate is not guarantee unless approved |
| Coupon | Validate code, eligibility, dates, usage, minimum, combinations | Never trust client total; record discount snapshot/reason |
| Manual payment | Create pending order → provide approved instructions → customer supplies safe reference/evidence → authorized staff confirms | Expiry; under/overpayment; evidence privacy; separation threshold |
| Cash on delivery | Confirm eligible zone/order/customer → create COD order | Risk/amount rules, failed-delivery handling, COD fee if approved |
| Online payment later | Create provider intent → verified webhook updates payment/order | Provider not selected; signature, idempotency, reconciliation, refund required |
| Confirmation | Commit order/item/totals/address snapshots and stock policy → issue reference | On transaction failure create nothing or recover safely |
| Preparation | Queue paid/approved order → pick/prepare → QC → ready | Out-of-stock discrepancy, custom approval, substitutions require consent |
| Shipping | Create shipment/reference → hand off → notify | Carrier failure/retry; do not mark shipped without evidence |
| Delivery | Carrier/staff confirms delivery → close fulfillment | Dispute and proof rules require owner/legal decision |
| Cancellation | Customer/staff requests → evaluate state/policy → release stock and refund if applicable | Prepared/shipped/custom orders may be ineligible; reason/audit required |
| Return | Verify eligibility/window/item condition → authorize → receive/inspect → outcome | Opened/personalized/perishable rules need legal approval |
| Refund | Approved amount → original/manual route → record reference/status → notify | Partial refund, fees, failure, reconciliation; dual approval threshold |
| Failed delivery | Record reason → contact/retry/return-to-sender → adjust fees/stock/payment | Customer refusal, bad address, damaged item treated by policy |
| Out of stock | Prevent checkout or place approved backorder; notify and offer safe alternatives | No automatic substitution, especially after recommendation |
| Personalized approval | Complete assessment/review → define versioned formula/quote → authorized approval → customer accepts → prepare/QC | No auto-formulation; component traceability, safety, cancellation/reorder rules required |

## Draft order states

`PENDING_PAYMENT`, `PAYMENT_REVIEW`, `CONFIRMED`, `PREPARING`, `READY_TO_SHIP`, `SHIPPED`, `DELIVERED`, with controlled terminal/exception states `CANCELLED`, `PAYMENT_FAILED`, `DELIVERY_FAILED`, `RETURN_REQUESTED`, `RETURNED`, `PARTIALLY_REFUNDED`, `REFUNDED`. Final names/transitions require owner approval.

