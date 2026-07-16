# Requirements Traceability Matrix

Status is `DRAFT` until the responsible owner/reviewer approves it. Priorities: MUST, SHOULD, COULD, NOT NOW.

## Business requirements (12)

| ID | Requirement (short) | Source | Priority | Phase | Acceptance | Status |
|---|---|---|---|---:|---|---|
| BR-001 | Independent Arabic presence | Master brief | MUST | 2 | Owner review | DRAFT |
| BR-002 | Consistent approved catalog | Master brief | MUST | 2 | Content audit | DRAFT |
| BR-003 | Direct commerce when selected | Master brief | MUST | 4 | E2E order | DRAFT |
| BR-004 | Reduce repetitive guidance | Master brief | MUST | 6–7 | Beta metric | DRAFT |
| BR-005 | Explainable non-diagnostic guidance | Safety brief | MUST | 6–7 | Specialist cases | DRAFT |
| BR-006 | Operate store through admin | Master brief | MUST | 5 | Role journeys | DRAFT |
| BR-007 | Human consultations | Master brief | SHOULD | 8 | Booking E2E | DRAFT |
| BR-008 | Minimized useful analytics | Master brief | SHOULD | 11 | Metric/privacy review | DRAFT |
| BR-009 | Trust, accuracy, transparency | Master brief | MUST | 2–12 | Content/UX audit | DRAFT |
| BR-010 | Future expansion without rebuild | Master brief | SHOULD | 1 | Architecture review | DRAFT |
| BR-011 | Named operational ownership | Discovery | MUST | 0 | Owner sign-off | DRAFT |
| BR-012 | Controlled beta | Master brief | SHOULD | 13 | Launch checklist | DRAFT |

## Functional requirements (40)

| ID | Requirement (short) | Source | Priority | Phase | Acceptance | Status |
|---|---|---|---|---:|---|---|
| FR-001 | Browse catalog | MVP | MUST | 2 | E2E | DRAFT |
| FR-002 | View complete product detail | Brief | MUST | 2 | Content/UI test | DRAFT |
| FR-003 | Search/filter | Brief | SHOULD | 2 | E2E | DRAFT |
| FR-004 | Contact business | MVP A | MUST | 2 | Link/form test | DRAFT |
| FR-005 | Account/auth lifecycle | Brief | MUST | 3 | E2E/security | DRAFT |
| FR-006 | Profile/address/consent | Brief | MUST | 3 | E2E | DRAFT |
| FR-007 | Persistent cart | MVP B | MUST | 4 | E2E | DRAFT |
| FR-008 | Server-validated checkout | MVP B | MUST | 4 | Integration/E2E | DRAFT |
| FR-009 | Order snapshot/reference | Commerce | MUST | 4 | DB integration | DRAFT |
| FR-010 | Order history/status | Brief | MUST | 4 | Access/E2E | DRAFT |
| FR-011 | Controlled order transitions | Commerce | MUST | 4–5 | State tests | DRAFT |
| FR-012 | Manual payment handling | MVP B | SHOULD | 4–5 | Permission/E2E | DRAFT |
| FR-013 | Cash on delivery | MVP B | SHOULD | 4 | E2E | DRAFT |
| FR-014 | Catalog/stock admin | Brief | MUST | 5 | Role E2E | DRAFT |
| FR-015 | Category/coupon/review/content admin | Brief | SHOULD | 5 | Role E2E | DRAFT |
| FR-016 | Cancellation/return/refund request | Brief | SHOULD | 4–5 | Policy scenarios | DRAFT |
| FR-017 | Fulfillment/return outcomes | Commerce | MUST | 4–5,9 | State tests | DRAFT |
| FR-018 | Safe reorder | Brief | COULD | 4 | Eligibility E2E | DRAFT |
| FR-019 | Verified moderated reviews | Brief | SHOULD | 2–5 | Eligibility tests | DRAFT |
| FR-020 | Versioned resumable assessment | MVP C | MUST | 6 | E2E | DRAFT |
| FR-021 | Assessment validation/consent | Safety brief | MUST | 6 | Integration | DRAFT |
| FR-022 | Deterministic referral screening | Safety brief | MUST | 6 | Golden cases | DRAFT |
| FR-023 | Safety exclusion before ranking | Safety brief | MUST | 7 | Golden cases | DRAFT |
| FR-024 | Explainable result/no-result | MVP C | MUST | 7 | Golden/UI cases | DRAFT |
| FR-025 | Recommendation versions stored | Architecture | MUST | 7 | Reproduction test | DRAFT |
| FR-026 | Managed version lifecycle | Discovery | MUST | 6–7 | Role/version tests | DRAFT |
| FR-027 | Specialist profile/availability | Brief | MUST | 8 | Role E2E | DRAFT |
| FR-028 | Booking lifecycle | Brief | MUST | 8 | E2E | DRAFT |
| FR-029 | Conflict/timezone safety | Discovery | MUST | 8 | Concurrency tests | DRAFT |
| FR-030 | Assessment-sharing consent | Privacy brief | MUST | 8 | Access tests | DRAFT |
| FR-031 | Assigned specialist access | Brief | MUST | 8 | Negative access tests | DRAFT |
| FR-032 | Private notes/customer summary | Brief | MUST | 8 | Access/E2E | DRAFT |
| FR-033 | Transactional notifications | Brief | SHOULD | 8–9 | Provider contract | DRAFT |
| FR-034 | User/role/setting admin | Brief | MUST | 5–8 | Role E2E | DRAFT |
| FR-035 | Audit important actions | Privacy brief | MUST | 3–12 | Audit tests | DRAFT |
| FR-036 | Customer data-rights request | Privacy brief | MUST | 3–5 | Workflow test | DRAFT |
| FR-037 | Staff process data requests | Privacy brief | MUST | 5 | Workflow/audit | DRAFT |
| FR-038 | Minimized analytics/export | Brief | SHOULD | 11 | Metric/access tests | DRAFT |
| FR-039 | Controlled later AI assistant | Brief | NOT NOW | 10 | Safety evaluation | DRAFT |
| FR-040 | Recoverable provider failures | Architecture | MUST | 4–10 | Failure tests | DRAFT |

## Non-functional requirements (22)

| ID | Requirement (short) | Source | Priority | Phase | Acceptance | Status |
|---|---|---|---|---:|---|---|
| NFR-001 | TLS/encryption at rest | Security brief | MUST | 1–13 | Config review | DRAFT |
| NFR-002 | Secrets stay server-side | Security brief | MUST | 1–13 | Secret scan | DRAFT |
| NFR-003 | Validate/encode/safe DB | Security brief | MUST | 1–12 | Tests/review | DRAFT |
| NFR-004 | Risk-based rate limits | Security brief | MUST | 3–12 | Integration | DRAFT |
| NFR-005 | WCAG 2.2 AA target | UX brief | MUST | 1–12 | Audit | DRAFT |
| NFR-006 | Keyboard/labels/errors | UX brief | MUST | 1–12 | Manual audit | DRAFT |
| NFR-007 | Responsive from 320px | UX brief | MUST | 1–12 | Viewport matrix | DRAFT |
| NFR-008 | Correct RTL/future LTR | UX brief | MUST | 1–12 | DOM/visual | DRAFT |
| NFR-009 | Core Web Vitals targets | Discovery | SHOULD | 2–13 | Field/lab | DRAFT |
| NFR-010 | Responsive image optimization | Brief | MUST | 2–13 | Asset audit | DRAFT |
| NFR-011 | 99.5% availability draft | Discovery | SHOULD | 13 | Monitoring | DRAFT |
| NFR-012 | Transaction/idempotency | Architecture | MUST | 4–10 | Failure tests | DRAFT |
| NFR-013 | Typed modular quality gates | Development rules | MUST | 1–14 | CI | DRAFT |
| NFR-014 | Layered test strategy | Development rules | MUST | 1–14 | Test inventory | DRAFT |
| NFR-015 | Structured redacted logs | Privacy brief | MUST | 1–13 | Log audit | DRAFT |
| NFR-016 | Monitoring/actionable alerts | Brief | MUST | 1–13 | Alert drill | DRAFT |
| NFR-017 | Backup/RPO/RTO draft | Brief | SHOULD | 12–13 | Restore drill | DRAFT |
| NFR-018 | Major browser support | Discovery | SHOULD | 2–12 | Browser matrix | DRAFT |
| NFR-019 | SEO foundations | Brief | SHOULD | 1–2 | SEO audit | DRAFT |
| NFR-020 | Clear recoverable Arabic errors | UX brief | MUST | 1–14 | UX tests | DRAFT |
| NFR-021 | Protected searchable audit | Privacy brief | MUST | 3–12 | Security tests | DRAFT |
| NFR-022 | Isolate locale/provider assumptions | Architecture | SHOULD | 1 | Review | DRAFT |

## Safety requirements (8)

| ID | Requirement | Source | Priority | Phase | Acceptance | Status |
|---|---|---|---|---:|---|---|
| SR-001 | Never diagnose, prescribe, promise cure, or imply professional identity. | Safety brief | MUST | 2–10 | Content/safety tests | DRAFT |
| SR-002 | Use only approved product facts, mappings, warnings, and rules. | Safety brief | MUST | 2–10 | Publication audit | DRAFT |
| SR-003 | Apply exclusions and referral before product ranking. | Safety brief | MUST | 6–7 | Golden cases | DRAFT |
| SR-004 | Support safe no-recommendation when information or evidence is insufficient. | Safety brief | MUST | 6–10 | Failure cases | DRAFT |
| SR-005 | Explain result and limitations using approved language. | Safety brief | MUST | 7–10 | Specialist review | DRAFT |
| SR-006 | High-risk draft categories require professionally approved referral behavior. | Safety brief | MUST | 6–8 | Specialist cases | DRAFT |
| SR-007 | No facial image analysis or image-based medical inference in current scope. | Master brief | NOT NOW | 14+ | Scope audit | DRAFT |
| SR-008 | AI cannot create the recommendation; it may only mediate validated structured workflow. | AI brief | MUST | 10 | Architecture/safety eval | DRAFT |

## Privacy requirements (8)

| ID | Requirement | Source | Priority | Phase | Acceptance | Status |
|---|---|---|---|---:|---|---|
| PR-001 | Collect only data necessary for a stated purpose. | Privacy brief | MUST | 1–12 | Data inventory | DRAFT |
| PR-002 | Provide clear notices and separate required/optional consent. | Privacy brief | MUST | 3–11 | UX/legal review | DRAFT |
| PR-003 | Version consent and retain proof without excess sensitive content. | Privacy brief | MUST | 3–11 | DB/workflow test | DRAFT |
| PR-004 | Share assessment with a specialist only under explicit scoped consent. | Privacy brief | MUST | 8 | Negative access test | DRAFT |
| PR-005 | Define retention/deletion/anonymization per data category and legal hold. | Privacy brief | MUST | 0–12 | Policy/workflow test | DRAFT |
| PR-006 | Support verified access, correction, export, and deletion requests. | Privacy brief | MUST | 3–5 | E2E/audit | DRAFT |
| PR-007 | Redact sensitive data from logs, analytics, notifications, and routine exports. | Privacy brief | MUST | 1–12 | Output audit | DRAFT |
| PR-008 | Keep specialist private notes separately access-controlled and purpose-limited. | Privacy brief | MUST | 8 | Security tests | DRAFT |

## Authorization requirements (10)

| ID | Requirement (short) | Source | Priority | Phase | Acceptance | Status |
|---|---|---|---|---:|---|---|
| AR-001 | Server-side authorization | Security brief | MUST | 3–12 | Negative tests | DRAFT |
| AR-002 | Customer ownership isolation | Privacy brief | MUST | 3–12 | IDOR tests | DRAFT |
| AR-003 | Least privilege/revocation | Privacy brief | MUST | 3–12 | Role tests | DRAFT |
| AR-004 | Controlled audited role assignment | Discovery | MUST | 3–5 | Escalation tests | DRAFT |
| AR-005 | Assigned/consented specialist access | Privacy brief | MUST | 8 | Negative tests | DRAFT |
| AR-006 | Private-note isolation | Privacy brief | MUST | 8 | Negative tests | DRAFT |
| AR-007 | Minimum order-staff access | Discovery | MUST | 4–5 | Field/access audit | DRAFT |
| AR-008 | Controlled safety publication | Safety brief | MUST | 5–7 | Workflow tests | DRAFT |
| AR-009 | Purpose-limited audited export | Privacy brief | MUST | 5–11 | Export tests | DRAFT |
| AR-010 | Controlled break-glass access | Security brief | MUST | 3–13 | Incident drill | DRAFT |

## Totals

BR 12; FR 40; NFR 22; SR 8; PR 8; AR 10. **Total: 100 unique requirements.**

## Phase 1 evidence update

Foundation evidence now exists for BR-001/002/009/010, FR-001/002/004, NFR-001/002/003/005/006/007/008/010/013/015/019/020/022, SR-001/002/004/007, PR-001/007, and AR-001/003. This does not mark later operational workflows complete; see `PHASE_1_TEST_REPORT.md` and `PHASE_1_ACCEPTANCE_CHECKLIST.md`. Business-facing requirements remain DRAFT pending owner approval.
# تتبع المرحلة الثانية

| المتطلب | التنفيذ | التحقق |
|---|---|---|
| متجر عربي RTL مصقول | الصفحات العامة و`globals.css` | الأحجام الستة بلا overflow |
| بحث/تصفية/فرز | `Catalog`, `product-filter.ts` | Vitest + متصفح |
| تفاصيل المنتج | `/products/[slug]` | build يولد 6 مسارات |
| تواصل محلي | `ContactForm` وschema | اختبار schema + متصفح |
| سياسات مؤقتة | 6 صفحات و`PolicyPage` | build/smoke |
| إتاحة | landmarks, labels, focus, live regions | مراجعة DOM ومتصفح |
| SEO | metadata, sitemap, robots, Breadcrumb JSON-LD | build ومراجعة المصدر |
| حدود النطاق | لا auth/cart/checkout/payment/AI/booking | مراجعة التنفيذ |
# Phase 3 traceability

| Requirement | Implementation | Verification |
|---|---|---|
| Register/login/logout | Better Auth API + Arabic forms | Browser + build |
| Recovery | Better Auth expiring reset token | Architecture review |
| Protected account | Server `requireSession` layout | Browser redirect |
| Profile/address/security | Server actions with Zod and ownership | Browser + TypeScript |
| Role safety | Non-input role default `CUSTOMER` | Schema/config review |
| Isolated database | Neon Preview/Development connection | Migration + Vercel env audit |

## Phase 4 traceability

| Requirement | Implementation | Evidence |
|---|---|---|
| Persistent secure cart | User-unique Cart and owned server actions | Build + service review |
| Safe order | Serializable transaction, snapshots, idempotency | Migration + tests |
| Coupons | Normalization, eligibility, caps and redemption | 12 rules tests |
| Inventory | Conditional decrement and movement ledger | Transaction review |
| Cancellation | State gate and unique restoration movement | Rules tests + schema |
# Phase 5 traceability update

| Requirement | Implementation | Verification |
|---|---|---|
| Server RBAC | `authorization.ts`, admin services | RBAC tests and route redirects |
| Catalog operations | product/variant services and routes | validation tests, Preview workflow |
| Inventory integrity | serializable adjustment service and movement ledger | negative/zero/idempotency tests |
| Order operations | transition map and payment confirmation | transition/double-confirmation tests |
| Privacy and audit | scoped customer query and recursive audit redaction | redaction tests and audit viewer |
| Safe content/settings | structured records and Zod allowlists | sanitization/URL/settings tests |
