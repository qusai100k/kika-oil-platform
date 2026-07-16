# Decision Register

No unknown business decision is confirmed.

| ID | Topic | Decision needed / options | Recommended default | Owner | Needed before | Status | Notes |
|---|---|---|---|---|---|---|---|
| D-001 | MVP | A catalog / B commerce / C guided commerce | C incrementally; stop at B if rules unavailable | Store Owner | Phase 1 scope | PROVISIONAL | Owner approval required |
| D-002 | Product model | Pre-made / variants / personalized / hybrid | Controlled variants | Store Owner + safety lead | Phase 1 | PROVISIONAL | Changes schema materially |
| D-003 | Jurisdiction | Operating/selling country | None | Store Owner | Phase 1 | OPEN | Drives legal/providers |
| D-004 | Currency/tax | Primary currency and tax display | One initial currency | Store Owner + accountant/legal | Phase 1 | OPEN | No tax advice assumed |
| D-005 | Shipping scope | Countries/zones and high-level method | One initial country/limited zones | Store Owner | Phase 1 | OPEN | Provider can wait |
| D-006 | Brand identity | Final name/assets/rights | Temporary name and neutral placeholders only | Store Owner | Phase 2; status before 1 | OPEN | Do not imply registration |
| D-007 | Catalog data | Real approved data vs demo placeholders | Explicitly marked demo data in Phase 1 | Store Owner | Phase 1 | OPEN | No invented claims |
| D-008 | Account ownership | Domain/cloud/database/email owners | Business-owned accounts and official email | Store Owner | Phase 1 | OPEN | Recovery owners required |
| D-009 | Budget/timeline | Ranges and phase approvers | Incremental beta, no fixed estimate yet | Store Owner | Phase 1 | OPEN | Affects NFR targets |
| D-010 | Authentication | Email/phone; verification; guest checkout | Email-based account; guest checkout deferred | Store Owner + technical lead | Phase 3 | PROVISIONAL | Country/UX dependent |
| D-011 | Payment launch | COD/manual/both | Both only if operationally supported | Store Owner | Phase 4 | OPEN | Provider not selected |
| D-012 | Stock timing | Reserve at checkout/payment/confirmation | Atomic deduction/reservation at confirmed order rule | Store Owner + operations | Phase 4 | PROVISIONAL | Needs expiry/release rule |
| D-013 | Returns | Eligibility/windows/custom/open products | No default until jurisdiction review | Store Owner + legal | Phase 4 | OPEN | Consumer law dependent |
| D-014 | Safety approver | Named qualified reviewer and evidence | Independent named specialist | Store Owner | Phase 6 | OPEN | Blocks MVP C launch |
| D-015 | Referral policy | Conditions, urgency, wording, route | Conservative referral/no-result | Specialist + legal | Phase 6 | PROVISIONAL | Not medical approval |
| D-016 | Assessment retention | Draft/submitted/result periods | Minimize; define by purpose | Privacy/legal + Owner | Phase 3/6 | OPEN | Include deletion effect |
| D-017 | Minor users | Allowed age bands/guardian process | Exclude unsupported minors | Owner + legal/specialist | Phase 6 | PROVISIONAL | Exact age unknown |
| D-018 | Pregnancy/medicine | Question relevance and effect | Ask only if reviewed; refer/restrict | Specialist + legal | Phase 6 | PROVISIONAL | Draft wording only |
| D-019 | Specialist verification | Evidence, reviewer, expiry | Independent verification before listing | Owner + legal | Phase 8 | PROVISIONAL | Jurisdiction dependent |
| D-020 | Consultation policy | price/duration/channel/cancellation/no-show | External meeting link; controlled durations | Store Owner + specialist | Phase 8 | PROVISIONAL | Booking/payment open |
| D-021 | Private notes | access/retention/customer rights | Separate restricted store/access | Legal/privacy + specialist | Phase 8 | PROVISIONAL | Owner no routine access |
| D-022 | Online payment | Provider | Deferred until country/account known | Store Owner | Phase 9 | DEFERRED | Do not select now |
| D-023 | Hosting/providers | Cloud, DB, media, mail, monitoring | Managed services fitting jurisdiction/budget | Owner + technical lead | Phase 1/9 | OPEN | Foundation host needed in 1 |
| D-024 | Analytics consent | Product analytics and marketing | Essential aggregate only; marketing opt-in | Owner + privacy/legal | Phase 11 | PROVISIONAL | Tools not selected |
| D-025 | AI | Provider/model and launch gate | After rules + human escalation; no free recommendation | Owner + safety + technical | Phase 10 | DEFERRED | No image analysis |
| D-026 | Availability/recovery | SLO/RPO/RTO | 99.5%; RPO 24h; RTO 8h draft | Owner + technical lead | Phase 12 | PROVISIONAL | Budget adjustment needed |
| D-027 | Beta | size, success, stop criteria | Limited invited beta | Store Owner | Phase 13 | PROVISIONAL | Metrics open |
| D-028 | Authentication architecture | Better Auth / Auth.js / managed provider | Better Auth + Prisma adapter, implementation deferred | Owner + technical lead | Phase 3 | PROVISIONAL | Phase 1 includes schema/authorization boundary only |
| D-029 | Phase 1 demo currency | Unconfirmed real currency / neutral code | UI marker only; database seed uses `XXX` | Store Owner | Phase 2/4 | PROVISIONAL | Must be replaced before commerce |
# قرارات المرحلة الثانية — 2026-07-16

- اعتماد لوحة عاجية/رملية/بنية وذهبي محدود وهوية مؤقتة حتى وصول دليل العلامة.
- Noto Sans Arabic للنص وNoto Kufi Arabic للعناوين بأوزان محدودة.
- إبقاء المنتجات في مصدر مركزي typed، مع منطق تصفية مستقل قابل للاختبار.
- استخدام صور محلية مولدة بدل أصول Instagram أو صور عملاء.
- عدم نشر Product structured data لأن البيانات والأسعار غير معتمدة؛ الاكتفاء بـBreadcrumb.
- التواصل محلي فقط، مع رسالة صريحة بعدم الإرسال.
