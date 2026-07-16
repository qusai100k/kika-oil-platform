# Coupon Rules

Codes are trimmed, uppercased, and stripped of spaces. Fixed and percentage coupons support active state, start/end, minimum subtotal, maximum discount, total usage, and per-customer usage. Validation and calculation are server-side. Discounts are capped at subtotal, coupon usage is claimed transactionally, and demo codes are seeded only in Development: `KIKA10`, `WELCOME25`, `EXPIRED10`, and `LIMITED5`.
