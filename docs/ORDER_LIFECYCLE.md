# Order Lifecycle

Manual transfer starts `PENDING_PAYMENT` with `AWAITING_TRANSFER`; COD starts `CONFIRMED` with `NOT_REQUIRED` because no online payment occurs. Customers can cancel only `PENDING_PAYMENT`, `PAYMENT_REVIEW`, or `CONFIRMED`. Fulfillment statuses remain staff-controlled for Phase 5. Every transition creates `OrderStatusHistory`; cancellation creates a request record, audit event, notification, and one-time stock restoration. Refund execution is not implemented.
