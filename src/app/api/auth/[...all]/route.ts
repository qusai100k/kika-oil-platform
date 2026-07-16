import { auth } from "@/server/auth/auth";
import { getDb } from "@/server/db/client";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);
export const GET = handler.GET;

const actions: Record<string,string> = {
  "/sign-up/email":"AUTH_REGISTRATION",
  "/sign-in/email":"AUTH_LOGIN",
  "/sign-out":"AUTH_LOGOUT",
  "/request-password-reset":"PASSWORD_RESET_REQUESTED",
  "/reset-password":"PASSWORD_RESET_COMPLETED",
  "/change-password":"PASSWORD_CHANGED",
};

export async function POST(request: Request) {
  const path = new URL(request.url).pathname.replace(/^\/api\/auth/, "");
  const response = await handler.POST(request);
  const action = actions[path];
  if (action) {
    try {
      const payload = response.ok ? await response.clone().json() as { user?: { id?: string } } : {};
      await getDb().auditLog.create({ data: { actorUserId: payload.user?.id, action, resourceType: "Authentication", outcome: response.ok ? "SUCCESS" : "FAILURE" } });
    } catch { /* Audit failure must not reveal or break authentication. */ }
  }
  return response;
}
