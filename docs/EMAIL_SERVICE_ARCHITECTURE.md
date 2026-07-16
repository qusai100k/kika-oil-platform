# Email Service Architecture

`src/server/email/service.ts` defines a provider-neutral transport for verification, recovery, welcome, and security messages. The current development transport records only a masked recipient and subject locally. It sends nothing in Preview or Production and never logs tokens or passwords.

Before commercial release, approve a provider and sender domain, then implement the same `EmailTransport` interface. Password recovery intentionally returns a generic response whether or not an account exists.
