# Production Environment Checklist

Production public URL:

https://kika-oil-platform.vercel.app

## Configured Production variables

Values are intentionally not documented.

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_SITE_URL`

## Environment rules

- Production secrets must not be reused from Preview or Development.
- Database credentials must never be committed or printed in logs.
- `NEXT_PUBLIC_SITE_URL` must point to the public Production URL.
- `BETTER_AUTH_URL` must point to the public Production URL.
- Production must not connect to the Development database.

