import type { UserRole } from "../../../generated/prisma/enums";

export type AuthenticatedPrincipal = { userId: string; roles: UserRole[] };

export function hasRole(principal: AuthenticatedPrincipal, allowed: readonly UserRole[]) {
  return principal.roles.some((role) => allowed.includes(role));
}

export function assertOwnsResource(principal: AuthenticatedPrincipal, ownerUserId: string) {
  if (principal.userId !== ownerUserId) throw new Error("FORBIDDEN");
}

// Authentication/session creation is intentionally deferred to Phase 3.
// Every future server action and route must establish a principal server-side.
