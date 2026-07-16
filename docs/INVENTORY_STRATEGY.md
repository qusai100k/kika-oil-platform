# Inventory Strategy

Stock belongs to `ProductVariant`. Order placement runs at PostgreSQL Serializable isolation and uses `UPDATE ... WHERE stock >= quantity` through Prisma `updateMany`; any failed line rolls back the entire order. Each successful decrement records a signed `InventoryMovement` and post-change balance. Cancellation restoration uses a unique `(order, variant, movement type)` constraint, so retries cannot restore twice.
