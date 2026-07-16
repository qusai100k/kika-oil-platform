# Assessment Admin Guide

Store Owner, Admin, and Super Admin may inspect provisional templates and rules. Content Manager has wording-oriented read access only in this foundation; Order Manager has none. Published versions are immutable by policy and new wording requires a new draft version. Sensitive individual views are not exposed in broad lists.

## Closure Notes

- Template changes must be made by duplicating an existing version into a draft, validating it, then publishing with the exact confirmation phrase.
- Options are copied onto the copied question records during duplication; source questions must never receive copied options.
- Long template duplication is allowed a longer transaction timeout to tolerate Preview database latency.
- `ORDER_MANAGER` is intentionally denied all assessment configuration and sensitive assessment reads.
- Opening `/admin/assessments/[assessmentId]` creates a `SENSITIVE_ASSESSMENT_VIEWED` audit event. Audit metadata stores purpose, status, and answer count only.
