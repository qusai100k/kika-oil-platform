# Money and Rounding

All persisted money uses PostgreSQL `DECIMAL(12,2)` and Prisma Decimal. Calculations round half-up to two decimal places. Phase 4 uses provisional currency `XXX`, demo shipping `25.00`, and disabled tax. Client totals are display-only; the order transaction recalculates every amount and prevents totals below zero.
