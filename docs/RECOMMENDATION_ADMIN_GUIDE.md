# Recommendation Admin Guide

Admin routes:

- `/admin/recommendations`
- `/admin/recommendations/configurations`
- `/admin/recommendations/runs`
- `/admin/recommendations/readiness`

Permissions:

- Store Owner, Admin, and Super Admin can configure.
- Content Manager can read recommendation administration.
- Order Manager has no access.

Published configurations are immutable. Duplicate a published configuration, edit the draft, validate, and publish with the confirmation phrase `PUBLISH REC vX`.
