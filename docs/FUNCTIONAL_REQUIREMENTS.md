# Functional Requirements

Requirements are capability-level and do not imply inclusion in the selected MVP. Planned phases follow the revised roadmap.

| ID | Requirement | Priority | Phase |
|---|---|---|---:|
| FR-001 | Visitors can browse approved categories and products. | MUST | 2 |
| FR-002 | Visitors can view product variants, ingredients, use, warnings, price, and availability as applicable. | MUST | 2 |
| FR-003 | Visitors can search and filter the catalog. | SHOULD | 2 |
| FR-004 | Visitors can contact the business through owner-approved channels. | MUST | 2 |
| FR-005 | Users can register, authenticate, recover access, and sign out under the chosen identity policy. | MUST | 3 |
| FR-006 | Customers can manage profile, addresses, and consent preferences. | MUST | 3 |
| FR-007 | Customers can add, update, and remove eligible items in a persistent cart. | MUST | 4 |
| FR-008 | Checkout validates customer/address, price, stock, shipping, coupon, and payment choice server-side. | MUST | 4 |
| FR-009 | The system creates an immutable order snapshot and unique reference. | MUST | 4 |
| FR-010 | Customers and authorized staff can view allowed order status/history. | MUST | 4 |
| FR-011 | Authorized staff can transition orders only through approved states. | MUST | 4–5 |
| FR-012 | The system handles manual payment evidence/confirmation without exposing it broadly. | SHOULD | 4–5 |
| FR-013 | The system supports cash-on-delivery when owner-approved. | SHOULD | 4 |
| FR-014 | Authorized staff can manage products, variants, prices, stock, images, and approved content. | MUST | 5 |
| FR-015 | Authorized staff can manage categories, coupons, reviews, and site content. | SHOULD | 5 |
| FR-016 | Customers can request cancellation, return, or refund under configured policy. | SHOULD | 4–5 |
| FR-017 | Staff can record fulfillment, shipment, delivery, failed-delivery, return, and refund outcomes. | MUST | 4–5, 9 |
| FR-018 | Customers can reorder an eligible previous standard item subject to current validation. | COULD | 4 |
| FR-019 | Only verified purchasers can submit product reviews; staff can moderate them. | SHOULD | 2–5 |
| FR-020 | Customers can complete and resume a versioned structured skin assessment. | MUST | 6 |
| FR-021 | The assessment validates required answers and records consent/version. | MUST | 6 |
| FR-022 | Deterministic screening can stop guidance and issue an approved referral message. | MUST | 6 |
| FR-023 | The recommendation engine excludes unsafe/incompatible products before ranking. | MUST | 7 |
| FR-024 | The result explains approved reasons, warnings, use guidance, alternatives, or no recommendation. | MUST | 7 |
| FR-025 | The system stores input, product-data, and ruleset versions for each recommendation. | MUST | 7 |
| FR-026 | Authorized staff can draft, approve, publish, retire, and test assessment/recommendation versions. | MUST | 6–7 |
| FR-027 | Verified specialists can manage profile and availability. | MUST | 8 |
| FR-028 | Customers can view eligible specialists/slots and create, reschedule, or cancel a booking under policy. | MUST | 8 |
| FR-029 | Booking prevents slot conflicts and handles timezone explicitly. | MUST | 8 |
| FR-030 | Customers can explicitly consent to share selected assessment data with the booked specialist. | MUST | 8 |
| FR-031 | Specialists can view assigned bookings, permitted shared data, and consultation history. | MUST | 8 |
| FR-032 | Specialists can keep restricted private notes and an optional customer-visible summary. | MUST | 8 |
| FR-033 | The system sends configured transactional confirmations and reminders. | SHOULD | 8–9 |
| FR-034 | Authorized administrators can manage users, roles, specialists, bookings, and settings. | MUST | 5–8 |
| FR-035 | Important administrative and sensitive-data actions generate audit events. | MUST | 3–12 |
| FR-036 | Customers can request access, correction, export, or deletion according to approved process. | MUST | 3–5 |
| FR-037 | Authorized staff can process data-subject requests with identity verification and legal holds. | MUST | 5 |
| FR-038 | Authorized users can view defined, minimized analytics and export permitted data. | SHOULD | 11 |
| FR-039 | A later AI assistant may collect follow-ups and explain only validated engine output. | NOT NOW | 10 |
| FR-040 | Provider failures produce recoverable states without duplicate orders, payments, bookings, or messages. | MUST | 4–10 |

## Explicit exclusions

No image-based diagnosis, unrestricted AI recommendation, medical diagnosis/prescription, built-in video calling, loyalty, subscriptions, mobile application, multi-currency, or English UI is required now.

