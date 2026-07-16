# Order Admin Workflow

Allowed transitions are centralized: pending/review to confirmed, confirmed to preparing, preparing to ready, ready to shipped, and shipped to delivered. Eligible states may cancel; cancellation restores each variant once using the movement uniqueness constraint. Manual transfers can be confirmed once and record confirmer and timestamp. Items, address, coupon, shipping, and totals are read-only snapshots.
