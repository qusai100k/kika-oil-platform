import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth/auth";

export async function getSession() { return auth.api.getSession({ headers: await headers() }); }
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent("/account")}`);
  return session;
}
