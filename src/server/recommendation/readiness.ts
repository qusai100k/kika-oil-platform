import type { ProductCandidate, ReadinessResult } from "./types";

export function productReadiness(product: ProductCandidate): ReadinessResult {
  const missing: string[] = [];
  if (product.status !== "ACTIVE") missing.push("active product");
  if (!product.variants.some((variant) => variant.isActive && variant.stock > 0)) missing.push("active in-stock variant");
  if (!product.variants.some((variant) => Number(variant.price) >= 0)) missing.push("price");
  if (!product.skinCompatibility.length) missing.push("skin-type mappings");
  if (!product.concernMappings.length) missing.push("concern mappings");
  if (!product.ingredients.length) missing.push("ingredient list");
  if (!product.usageAr) missing.push("usage instructions");
  if (!product.safetyNoticeAr) missing.push("safety notice");
  return { ready: missing.length === 0, missing };
}

export function readinessSummary(products: ProductCandidate[]) {
  return products.map((product) => ({
    productId: product.id,
    nameAr: product.nameAr,
    slug: product.slug,
    ...productReadiness(product),
  }));
}
