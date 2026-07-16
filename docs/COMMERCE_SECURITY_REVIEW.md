# Commerce Security Review

Controls cover session-based ownership, UUID/internal IDs, constrained public order-reference format, safe lookups, Zod inputs, CSRF-safe server actions, immutable snapshots, idempotency, Serializable transactions, conditional stock decrement, coupon limits, non-negative totals, audit events, and one-time restoration. No sensitive payment data, bank account, card field, upload, or real payment credential is accepted. Admin fulfillment and refund controls are deferred to Phase 5.
