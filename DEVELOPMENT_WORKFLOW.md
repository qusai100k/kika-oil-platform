# Kika Oil Platform Development Workflow

This workflow protects the approved client presentation while allowing future phases to be reviewed safely before release.

## Branch strategy

- `main` is the protected production branch and represents the version currently approved for the public client URL.
- `develop` is the integration branch for all future phase work.
- Each future phase begins from `develop` and its changes are committed separately with clear, phase-specific messages.
- Work must remain on `develop` unless the business owner explicitly approves a production release.
- `develop` must never be merged into `main` without explicit approval from the project owner.

## Production workflow

1. The public Vercel deployment is sourced from `main`.
2. No direct development work is performed on `main`.
3. A production release requires explicit approval to merge the reviewed `develop` changes.
4. Before a release, run linting, type checking, tests, the production build, and the agreed acceptance checks.
5. Merge only the approved commits, then verify the Vercel production deployment and public routes.

## Preview workflow

1. New work is committed and pushed to `develop`.
2. Vercel creates a Preview Deployment for the pushed `develop` commit.
3. The preview receives a separate URL and does not replace the public production domain.
4. Review design, responsive behavior, accessibility, console output, and affected workflows on the preview.
5. Fixes remain on `develop` and create updated previews until approval is given.

## Merge workflow

1. Confirm that the phase has its own clear commits on `develop`.
2. Confirm that automated checks and preview QA pass.
3. Present the preview URL and change summary for approval.
4. Wait for explicit authorization to merge into `main`.
5. Merge without rewriting the approved history, push `main`, and monitor the production deployment.
6. Verify the production URL after release and record the deployment result.

## Rollback strategy

- Vercel retains previous production deployments, allowing the last known-good deployment to be promoted again if necessary.
- Git history on `main` remains the source of truth for approved releases.
- For a faulty release, prefer reverting the release commit with a new commit instead of rewriting shared history.
- After reverting, push `main`, verify the replacement production deployment, and document the incident and resolution.
- Never use destructive history operations such as force-pushing or resetting the shared production branch.

## Commit discipline for future phases

- Start every phase from the latest `develop` branch.
- Keep unrelated work out of the phase commit.
- Use messages such as `Phase 3: add customer authentication foundation` or `Phase 3: fix preview accessibility findings`.
- Commit documentation, implementation, and corrective QA changes separately when that improves review clarity.
- Do not merge or deploy to production until the project owner explicitly approves the release.
# Phase 3 note

Phase 3 database and auth variables are scoped only to Vercel Preview and Development. The `develop` branch creates Preview deployments; `main` remains the sole production branch and must not be merged without explicit approval.
