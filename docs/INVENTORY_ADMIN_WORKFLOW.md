# Inventory Admin Workflow

Adjustments support restock, damage, correction, and manual adjustment. Each requires quantity, reason, authorized actor, and idempotency key. The serializable transaction rejects a negative result, updates the variant, writes the balance-after movement, and audits the action. Historical movements are never editable.
