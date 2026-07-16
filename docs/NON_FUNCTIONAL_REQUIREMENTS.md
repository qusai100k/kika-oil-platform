# Non-Functional Requirements

Targets are draft and require adjustment after budget, traffic, hosting, and jurisdiction are known.

| ID | Draft measurable requirement | Priority | Verification |
|---|---|---|---|
| NFR-001 | Enforce TLS in production and provider-managed encryption at rest where available. | MUST | Configuration review |
| NFR-002 | No secrets or sensitive values are shipped to the browser or repository. | MUST | Secret scan/build review |
| NFR-003 | Validate all untrusted server inputs; encode output and use safe database APIs. | MUST | Tests/security review |
| NFR-004 | Rate-limit authentication, assessment, contact, checkout, booking, and AI endpoints by risk. | MUST | Integration tests |
| NFR-005 | Target WCAG 2.2 AA for customer and operational critical paths. | MUST | Automated + manual audit |
| NFR-006 | All critical flows work by keyboard with visible focus and meaningful labels/errors. | MUST | Manual test |
| NFR-007 | Support mobile layouts from 320 CSS px and common tablet/desktop widths without horizontal overflow. | MUST | Responsive matrix |
| NFR-008 | Arabic pages use correct RTL semantics; direction-neutral components also tolerate future LTR. | MUST | Visual/DOM tests |
| NFR-009 | On representative mid-tier mobile and normal 4G, target p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 for public pages. | SHOULD | Field/lab monitoring |
| NFR-010 | Optimize responsive images; do not serve materially oversized originals in catalog views. | MUST | Build/runtime audit |
| NFR-011 | Target 99.5% monthly availability for public commerce after launch, excluding announced maintenance. | SHOULD | Uptime monitor |
| NFR-012 | Critical operations are idempotent or transactionally protected against retries/concurrency. | MUST | Failure/concurrency tests |
| NFR-013 | Code is modular, typed, documented at boundaries, and passes agreed lint/type/build gates. | MUST | CI |
| NFR-014 | Critical domain rules have unit tests; database/provider contracts have integration tests; primary journeys have E2E tests. | MUST | Coverage inventory |
| NFR-015 | Structured logs use correlation IDs and redact assessment, credentials, payment evidence, tokens, and private notes. | MUST | Log review |
| NFR-016 | Production errors and health/critical-business failures are monitored with actionable alerts. | MUST | Alert drill |
| NFR-017 | Backups are automated and encrypted; draft target RPO 24h and RTO 8h until owner approves. | SHOULD | Restore drill |
| NFR-018 | Support current and previous major versions of Chrome, Safari, Edge, and Firefox at release. | SHOULD | Browser matrix |
| NFR-019 | Public indexable pages provide unique metadata, canonical rules, sitemap, robots policy, and structured data where accurate. | SHOULD | SEO audit |
| NFR-020 | User-visible failures use clear Arabic messages, preserve recoverable input, and provide safe retry/support paths. | MUST | UX tests |
| NFR-021 | Audit records for privileged actions are searchable, access-controlled, timestamped, and protected from ordinary editing. | MUST | Security test |
| NFR-022 | Foundation supports one initial locale/currency while isolating locale, timezone, currency, and provider assumptions. | SHOULD | Architecture review |

