import { describe, expect, it } from "vitest";
import { demoProducts } from "@/constants/content";
import { filterAndSortProducts } from "@/lib/product-filter";
describe("filterAndSortProducts", () => {
  it("searches Arabic names", () => expect(filterAndSortProducts([...demoProducts], { search: "المساء" }).length).toBeGreaterThan(0));
  it("combines filters", () => { const result = filterAndSortProducts([...demoProducts], { category: "face-oils", skinType: "المختلطة", concern: "إحساس بالراحة", availability: "available" }); expect(result.every((p) => p.categorySlug === "face-oils" && p.available)).toBe(true); });
  it("sorts prices", () => { const asc = filterAndSortProducts([...demoProducts], { sort: "price-asc" }); const desc = filterAndSortProducts([...demoProducts], { sort: "price-desc" }); expect(asc[0].price).toBeLessThanOrEqual(asc.at(-1)!.price); expect(desc[0].price).toBeGreaterThanOrEqual(desc.at(-1)!.price); });
  it("returns empty results", () => expect(filterAndSortProducts([...demoProducts], { search: "غير موجود إطلاقًا" })).toEqual([]));
});
