# User Roles and Permission Boundaries

Roles may be combined only when the Store Owner approves the assignment; effective permissions are the union, except explicit separation-of-duty restrictions. Super Admin is technical emergency administration, not routine business access.

| Role | Accessible areas / allowed actions | Restricted actions | Sensitive data | MVP need |
|---|---|---|---|---|
| Visitor | Public catalog/content, contact, start registration | No account, order, assessment history, admin or specialist data | None beyond own submitted contact data | A/B/C |
| Customer | Own profile/addresses/consents, cart/orders, own assessments/recommendations/bookings/reviews | No other customer data; no rule/content/status administration | Own data; controls optional assessment sharing | B/C |
| Admin | General operational dashboard as separately granted | No automatic private notes, credentials, role escalation, or safety-rule approval | Only data necessary for assigned task | B/C |
| Store Owner | Business settings, staff assignment, products, operations, reports, approvals | Cannot bypass legal retention or read specialist private notes by default; cannot act as system Super Admin implicitly | Business/customer data subject to purpose | B/C |
| Content Manager | Draft/edit public content, product copy/images; submit/publish only if granted | No prices, stock, orders, payments, assessments, private notes, user roles | Normally none | Optional B/C |
| Order Manager | Orders, fulfillment, permitted customer contact/address, payment confirmation/refund workflow | No passwords, full assessments, private notes, rules, staff roles | Order, address, minimum payment evidence | B/C |
| Specialist | Own profile/availability/assigned bookings; consented assessment; own private notes and summary | No unrelated customers/orders, other specialists’ notes, platform roles, commerce administration | Consented assessment and assigned consultation records | C only if referral booking included; otherwise Phase 8 |
| Super Admin | Technical configuration, recovery, role bootstrap, incident response | No routine content/commerce use; sensitive access must be justified/audited | Break-glass access only where technically unavoidable | One controlled account by Phase 3 |

## Authorization requirements

| ID | Requirement |
|---|---|
| AR-001 | Every non-public action is authenticated and authorized server-side. |
| AR-002 | Customers can access only records they own or are explicitly party to. |
| AR-003 | Staff permissions follow least privilege and can be revoked promptly. |
| AR-004 | Role assignment and privilege escalation require Store Owner or controlled Super Admin authority and audit. |
| AR-005 | Specialist access is limited to assigned consultations and explicitly shared assessment data. |
| AR-006 | Private specialist notes are inaccessible to customers and routine business administrators unless a legally approved exception applies. |
| AR-007 | Order staff see only customer and payment data needed to fulfill/resolve the order. |
| AR-008 | Publishing safety-sensitive product/rule content requires the configured approval authority. |
| AR-009 | Exports require a specific permission, purpose, scope limitation, and audit event. |
| AR-010 | Break-glass access is time-limited where feasible, monitored, and reviewed after use. |

## Separation-of-duty defaults

- Content drafting and safety approval should be separate for clinical/safety-sensitive text.
- Manual payment confirmation and refund approval should be separated above an owner-defined threshold.
- A specialist cannot self-verify; role changes cannot be self-approved.

