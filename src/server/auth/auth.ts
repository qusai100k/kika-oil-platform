import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getDb } from "@/server/db/client";
import { emailService } from "@/server/email/service";

const baseURL = process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "Kika Oil",
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET,
  database: prismaAdapter(getDb(), { provider: "postgresql" }),
  user: { additionalFields: { role: { type: "string", input: false, defaultValue: "CUSTOMER" } } },
  trustedOrigins: [baseURL],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await emailService.send({ to: user.email, subject: "استعادة كلمة المرور", text: `استخدمي الرابط الآمن لاستعادة حسابك: ${url}` });
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await emailService.send({ to: user.email, subject: "تأكيد البريد الإلكتروني", text: `أكدي بريدك من الرابط الآمن: ${url}` });
    },
  },
  session: { expiresIn: 60 * 60 * 24 * 30, updateAge: 60 * 60 * 24 },
  rateLimit: { enabled: true, window: 60, max: 10 },
  advanced: { cookiePrefix: "kika", useSecureCookies: process.env.NODE_ENV === "production", database: { generateId: () => crypto.randomUUID() } },
});
