# Authentication Architecture

Phase 3 uses Better Auth 1.6.23 with its Prisma adapter, PostgreSQL on Neon, and server-side HTTP-only sessions. Public registration can only create `CUSTOMER`; role fields are never accepted from the browser. Account layouts call `requireSession()` on the server and all mutations derive ownership from the authenticated session.

Password reset tokens are hashed/managed by Better Auth, expire after one hour, are single-use, and reset completion revokes sessions. Email verification is prepared but optional until an approved provider is connected. Secure cookies are forced outside local development. Better Auth's built-in rate limiter protects authentication endpoints.

Database IDs are UUIDs generated with `crypto.randomUUID()`. Important authentication outcomes are recorded without email addresses, passwords, tokens, or request payloads.
