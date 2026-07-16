import { redirect } from "next/navigation";
import type { UserRole } from "../../../generated/prisma/enums";

export const permissions = ["dashboard:view","products:read","products:write","inventory:read","inventory:write","orders:read","orders:write","payments:confirm","coupons:write","customers:read","customers:sensitive","reviews:moderate","content:write","settings:write","analytics:read","audit:read","team:manage"] as const;
export type Permission = typeof permissions[number];
export type AuthenticatedPrincipal = { userId: string; roles: UserRole[] };

const all: Permission[]=[...permissions];
export const rolePermissions: Record<UserRole,readonly Permission[]>={
  CUSTOMER:[],SPECIALIST:[],
  CONTENT_MANAGER:["dashboard:view","products:read","products:write","inventory:read","reviews:moderate","content:write"],
  ORDER_MANAGER:["dashboard:view","inventory:read","inventory:write","orders:read","orders:write","payments:confirm","customers:read"],
  ADMIN:all.filter(p=>p!=="team:manage"),STORE_OWNER:all.filter(p=>p!=="team:manage"),SUPER_ADMIN:all,
};
export function hasRole(p:AuthenticatedPrincipal,allowed:readonly UserRole[]){return p.roles.some(r=>allowed.includes(r));}
export function can(role:UserRole,permission:Permission){return rolePermissions[role].includes(permission);}
export function assertPermission(role:UserRole,permission:Permission){if(!can(role,permission))throw new Error("FORBIDDEN");}
export function assertOwnsResource(p:AuthenticatedPrincipal,ownerUserId:string){if(p.userId!==ownerUserId)throw new Error("FORBIDDEN");}
export async function requireAdmin(permission:Permission="dashboard:view"){
  const {getSession}=await import("@/server/auth/session");
  const session=await getSession();if(!session)redirect(`/login?next=${encodeURIComponent("/admin")}`);
  const role=session.user.role as UserRole;if(!can(role,permission))redirect("/account?notice=admin-forbidden");
  return {user:session.user,role};
}
