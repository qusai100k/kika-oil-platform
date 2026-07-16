# Recommendation Privacy and Security

Implemented protections:

- Strict recommendation ownership.
- Server-side generation only.
- No sensitive answers in URLs.
- No client-provided scores, eligibility, or rankings.
- Idempotency for generation.
- Existing cart validation for add-to-cart.
- Safe audit metadata with status, config version, and item count only.
- ORDER_MANAGER denied by permission model.

Recommendation snapshots store the minimum profile needed for reproducibility, not a medical diagnosis.
