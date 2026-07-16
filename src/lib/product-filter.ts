import type { DemoProduct } from "@/constants/content";

export type ProductFilters = { search?: string; category?: string; skinType?: string; concern?: string; availability?: string; sort?: string };

export function filterAndSortProducts(products: DemoProduct[], filters: ProductFilters) {
  const search = filters.search?.trim().toLocaleLowerCase("ar") ?? "";
  const result = products.filter((product) => {
    const searchable = `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase("ar");
    return (!search || searchable.includes(search)) && (!filters.category || product.categorySlug === filters.category) && (!filters.skinType || product.skinTypes.includes(filters.skinType)) && (!filters.concern || product.concerns.includes(filters.concern)) && (!filters.availability || (filters.availability === "available" ? product.available : !product.available));
  });
  return result.sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    if (filters.sort === "name") return a.name.localeCompare(b.name, "ar");
    return Number(b.featured) - Number(a.featured);
  });
}
