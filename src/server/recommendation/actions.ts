"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/server/auth/session";
import { addRecommendedVariantToCart, generateRecommendation } from "./service";

export async function generateRecommendationAction(assessmentId: string) {
  const { user } = await requireSession();
  const row = await generateRecommendation(user.id, assessmentId, randomUUID());
  revalidatePath("/account/recommendations");
  redirect(`/account/recommendations/${row.id}`);
}

export async function addRecommendationItemToCartAction(recommendationId: string, itemId: string) {
  const { user } = await requireSession();
  await addRecommendedVariantToCart(user.id, recommendationId, itemId);
  revalidatePath("/cart");
  redirect("/cart");
}
