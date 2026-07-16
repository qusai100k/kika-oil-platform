# Production Rollback Plan

## Rollback reference

Backup branch:

`backup/pre-v0.6.0-production`

Previous Vercel Production deployment:

Use the last Ready Production deployment that existed before the v0.6.0 `main` push.

## If deployment fails before becoming Ready

1. Do not retry blindly.
2. Inspect Vercel build logs.
3. Keep failed deployment evidence.
4. Fix on `develop` or an approved release branch, not directly in Production.
5. Redeploy only after Preview or local production verification.

## If smoke testing fails after deployment

1. Promote the previous stable Vercel Production deployment.
2. If needed, restore `main` by reverting the merge commit with a new commit.
3. Do not force-push.
4. Document the failure, affected routes, root cause, and recovery action.
5. Continue fixes outside Production.

