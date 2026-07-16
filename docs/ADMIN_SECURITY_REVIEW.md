# Admin Security Review

- Authorization: centralized server-side RBAC; safe redirects for non-admin sessions.
- Privilege escalation: Better Auth role input remains disabled; public/profile forms cannot set roles; only Super Admin service may assign operational roles and cannot self-promote.
- IDOR: admin details require permission and server-resolved identifiers; customer routes retain ownership filters.
- Integrity: Zod allowlists prevent mass assignment; order transitions and payment confirmation are state-checked and idempotent.
- Inventory: serializable updates, non-negative invariant, append-only movements, one-time cancellation restoration.
- XSS: structured plain text, no arbitrary HTML, HTTP(S)-only setting links.
- Audit privacy: recursive redaction removes password/token/secret/cookie/private keys and truncates large values.
- Uploads: no unsafe public upload endpoint; SVG/script and ephemeral filesystem risks avoided pending durable provider selection.
- Known limitation: CSRF depends on Better Auth same-site session controls and Next server actions; a dedicated origin regression suite remains advisable before commercial launch.
