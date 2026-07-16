# Project Structure

```text
src/
  app/                 App Router pages, metadata, loading/error boundaries
    (public)/          public demonstration routes
  components/
    ui/                typed accessible primitives
    layout/            header and footer
    shared/            container, headings, breadcrumb, visual wrapper
    product/           product card and price display
    forms/             field wrapper and local contact form
    feedback/          empty, error, and success states
  config/              site and environment configuration
  constants/           centralized Arabic demo content
  lib/                 small shared utilities
  schemas/             Zod input schemas
  server/
    auth/              authorization-only foundation
    db/                lazy Prisma access
prisma/                provisional schema and explicit demo seed
generated/             generated Prisma client; ignored
public/                future approved static assets
docs/                  discovery and implementation documentation
```

No empty domain folders were created. Repositories/services/hooks/types should be added only when a concrete Phase 2+ use case exists.

