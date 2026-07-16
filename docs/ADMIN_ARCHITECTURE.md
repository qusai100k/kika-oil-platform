# Admin Architecture

Phase 5 uses protected React Server Component routes under `/admin`, server actions, Zod validation, Prisma transactions, and a centralized role-permission map. Navigation is role-aware but every read and mutation independently calls `requireAdmin` or `assertPermission`. Operational changes create append-only `AuditLog` records. Orders retain immutable commerce snapshots.

The dashboard reads only Neon Development in Preview. No admin API trusts a submitted role. Public registration remains `CUSTOMER`; controlled role assignment promotes an already authenticated development account without creating or recording a password.

Image records now support provider-neutral metadata, primary status, MIME type, size, and storage key. Persistent binary upload is intentionally disabled until a durable provider is approved; Vercel's ephemeral filesystem is never used as permanent media storage.
