import type {
  CustomerRecommendationProfile,
  ProductCandidate,
  ScoreContribution,
  ScoredProduct,
} from "./types";

const clamp = (score: number) => Math.max(0, Math.min(100, score));

export function matchLevel(score: number) {
  if (score >= 80) return "قوي";
  if (score >= 60) return "متوسط";
  return "محدود";
}

export function scoreProduct(
  profile: CustomerRecommendationProfile,
  product: ProductCandidate,
): ScoredProduct | null {
  const variant =
    product.variants.find((item) => item.isDefault && item.isActive && item.stock > 0) ??
    product.variants.find((item) => item.isActive && item.stock > 0);
  if (!variant) return null;

  const contributions: ScoreContribution[] = [];
  const add = (code: string, labelAr: string, delta: number) =>
    contributions.push({ code, labelAr, delta });

  add("base", "قاعدة ترشيح مبدئية للمنتجات المتاحة", 40);

  if (product.skinCompatibility.some((item) => item.skinType.slug === profile.skinType))
    add("skin_type", "يتوافق مع نوع البشرة الذي اخترتِه", 25);

  const concernSlugs = product.concernMappings.map((item) => item.skinConcern.slug);
  for (const concern of profile.concerns) {
    if (concernSlugs.includes(concern)) add(`concern_${concern}`, "يرتبط بالاهتمام الذي حددتِه", 14);
  }

  if (profile.routinePreference === "simple" && product.ingredients.length <= 3)
    add("simple_routine", "يناسب تفضيل روتين بسيط", 8);

  if (profile.sensitivity === "high") add("sensitivity_caution", "حساسية عالية مذكورة؛ خفض احترازي", -18);
  else if (profile.sensitivity === "medium") add("sensitivity_caution", "تحسس متوسط مذكور؛ خفض احترازي", -8);

  if (variant.stock <= 3) add("low_stock", "توفر محدود للمتغير المتاح", -4);

  const score = clamp(contributions.reduce((sum, item) => sum + item.delta, 0));
  return {
    product,
    variant,
    score,
    matchLevel: matchLevel(score),
    contributions,
    explanationAr: "",
  };
}

export function rankProducts(items: ScoredProduct[]) {
  return [...items].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.product.sortOrder !== a.product.sortOrder) return a.product.sortOrder - b.product.sortOrder;
    if (b.variant.stock !== a.variant.stock) return b.variant.stock - a.variant.stock;
    return a.product.id.localeCompare(b.product.id);
  });
}
