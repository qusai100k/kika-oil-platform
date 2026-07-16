# Environment Variables

| Variable | Phase 1 | Exposure | Purpose |
|---|---|---|---|
| `DATABASE_URL` | Required for Prisma connection/migrate/seed | Server secret | PostgreSQL URL |
| `NEXT_PUBLIC_SITE_URL` | Required/recommended | Public | canonical/metadata base, local default is localhost |
| `AUTH_SECRET` | Future Phase 3 | Server secret | authentication signing/encryption secret |
| `IMAGE_STORAGE_URL` | Future | Depends on provider | cloud image storage configuration |
| `EMAIL_PROVIDER_API_KEY` | Future | Server secret | transactional email |
| `AI_PROVIDER_API_KEY` | Future Phase 10 | Server secret | controlled AI provider |
| `PAYMENT_PROVIDER_SECRET` | Future Phase 9 | Server secret | payment integration |

Only `NEXT_PUBLIC_` variables may be exposed to the browser. Empty future placeholders are inactive and must not be populated until their phase.

