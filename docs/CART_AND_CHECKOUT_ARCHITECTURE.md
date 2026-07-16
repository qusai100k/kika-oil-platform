# Cart and Checkout Architecture

Authenticated carts are unique by user and variant lines are unique per cart. Server actions derive ownership from the session, validate integer quantities (1–10), merge duplicates, check active product/variant state and stock, and recalculate prices. Checkout validates the owned address, every line, coupon, stock, shipping, and totals again. The browser never submits authoritative money values. An idempotency UUID prevents duplicate order creation; the cart clears only after the transaction succeeds.
