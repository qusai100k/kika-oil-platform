# Local Development Guide

## Requirements

Node.js 20.9+ (tested on 24.12.0), npm, and PostgreSQL.

## Setup

1. Copy `.env.example` to `.env`.
2. Set a working PostgreSQL `DATABASE_URL`; create the target database if necessary.
3. `npm install`
4. `npm run prisma:generate`
5. `npm run db:migrate -- --name phase1_initial`
6. `npm run db:seed`
7. `npm run dev`

Open `http://localhost:3000`. The public demo does not require a live database; migration/seed do.

## Troubleshooting

- `P1000`: username/password in `DATABASE_URL` is invalid.
- Connection failure: start PostgreSQL and verify host/port/database.
- Do not switch to SQLite; this project is designed for PostgreSQL.
- Generated Prisma files are recreated with `npm run prisma:generate` and are not committed.

