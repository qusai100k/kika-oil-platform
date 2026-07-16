"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/server/auth/authorization";
import { archiveRecommendationConfig, createRecommendationConfig, duplicateRecommendationConfig, publishRecommendationConfig } from "./admin";

async function actor() {
  const { user, role } = await requireAdmin("recommendations:configure");
  return { id: user.id, role };
}

export async function createRecommendationConfigAction(formData: FormData) {
  const row = await createRecommendationConfig(await actor(), String(formData.get("nameAr") || "إعداد توصيات مبدئي"));
  redirect(`/admin/recommendations/configurations#${row.id}`);
}

export async function duplicateRecommendationConfigAction(id: string) {
  const row = await duplicateRecommendationConfig(await actor(), id);
  redirect(`/admin/recommendations/configurations#${row.id}`);
}

export async function publishRecommendationConfigAction(id: string, formData: FormData) {
  await publishRecommendationConfig(await actor(), id, String(formData.get("confirmation") || ""));
  revalidatePath("/admin/recommendations/configurations");
}

export async function archiveRecommendationConfigAction(id: string, formData: FormData) {
  await archiveRecommendationConfig(await actor(), id, String(formData.get("confirmation") || ""));
  revalidatePath("/admin/recommendations/configurations");
}
