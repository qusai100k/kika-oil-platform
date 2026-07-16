# Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `DATABASE_URL` | Server, Preview/Development | Pooled Neon PostgreSQL connection |
| `DATABASE_URL_UNPOOLED` | Tooling, Preview/Development | Direct migration connection |
| `BETTER_AUTH_SECRET` | Server, Preview/Development | Session/signature secret, minimum 32 random bytes |
| `BETTER_AUTH_URL` | Server | Trusted callback origin |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL |

Never expose database credentials or the auth secret through `NEXT_PUBLIC_*`. Production database configuration is deliberately absent during Phase 3.

Phase 4 introduces no new secrets. Currency, demo shipping, tax disabled state, and provisional payment availability live in server-controlled `src/config/commerce.ts` and must be approved before Production.
# Phase 5 controlled role setup

`ADMIN_SEED_EMAIL` and `ADMIN_SEED_ROLE` are command-scoped development inputs for `npm run admin:promote`; they are not required runtime secrets and must not be stored in Production. The script requires an existing account, never accepts a password, and refuses `VERCEL_ENV=production`. No media-provider secret was introduced.
# Phase 6

No new runtime secrets or external providers were introduced. Assessment data uses the existing Preview/Development `DATABASE_URL` only.
