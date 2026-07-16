# Assessment Conditional Logic

`conditional.ts` is the shared, client-safe evaluator. The wizard and server validation use the same visibility, hidden-answer cleanup, section validation, and applicable-progress semantics. Parent changes are processed to a stable state, recursively removing answers that are no longer applicable. Server option ownership and template membership remain authoritative.
