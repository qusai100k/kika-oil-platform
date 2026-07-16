import type { CustomerRecommendationProfile, Exclusion, ProductCandidate } from "./types";
import { productReadiness } from "./readiness";

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

export function excludeProduct(
  profile: CustomerRecommendationProfile,
  product: ProductCandidate,
): Exclusion[] {
  const exclusions: Exclusion[] = [];
  const readiness = productReadiness(product);
  if (!readiness.ready)
    exclusions.push({
      productId: product.id,
      productNameAr: product.nameAr,
      code: "PRODUCT_DATA_INCOMPLETE",
      internalReason: `Missing: ${readiness.missing.join(", ")}`,
      customerSafeReason: "معلومات المنتج لم تكتمل بما يكفي لاستخدامه في الإرشاد.",
    });

  if (!product.variants.some((variant) => variant.isActive && variant.stock > 0))
    exclusions.push({
      productId: product.id,
      productNameAr: product.nameAr,
      code: "NO_AVAILABLE_VARIANT",
      internalReason: "No active in-stock variant",
      customerSafeReason: "المنتج غير متاح للطلب التجريبي حاليًا.",
    });

  const skinSlugs = product.skinCompatibility.map((item) => item.skinType.slug);
  if (profile.skinType !== "uncertain" && !skinSlugs.includes(profile.skinType))
    exclusions.push({
      productId: product.id,
      productNameAr: product.nameAr,
      code: "SKIN_TYPE_INCOMPATIBLE",
      internalReason: `Profile skin type ${profile.skinType} not in product mappings`,
      customerSafeReason: "تم استبعاد منتج لأنه لا يطابق نوع البشرة المذكور في البيانات المتاحة.",
    });

  const ingredientSlugs = product.ingredients.map((item) => normalize(item.ingredient.slug));
  const ingredientNames = product.ingredients.map((item) => item.ingredient.nameAr.toLowerCase());
  for (const allergy of profile.allergies) {
    const needle = normalize(allergy);
    if (needle && (ingredientSlugs.some((slug) => slug.includes(needle)) || ingredientNames.some((name) => name.includes(allergy.toLowerCase()))))
      exclusions.push({
        productId: product.id,
        productNameAr: product.nameAr,
        code: "DECLARED_ALLERGY",
        internalReason: "Declared allergy matched product ingredient",
        customerSafeReason: "تم استبعاد منتج بسبب معلومة سلامة ذكرتِها.",
      });
  }

  if (profile.previousReaction || profile.prescriptionUse || profile.pregnancyOrBreastfeeding)
    exclusions.push({
      productId: product.id,
      productNameAr: product.nameAr,
      code: "HUMAN_REVIEW_REQUIRED",
      internalReason: `Safety flags: ${profile.safetyFlags.join(", ")}`,
      customerSafeReason: "يفضل انتظار مراجعة مؤهلة قبل إرشاد المنتج.",
    });

  return exclusions;
}
