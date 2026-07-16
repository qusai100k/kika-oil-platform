"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, demoProducts } from "@/constants/content";
import { filterAndSortProducts, type ProductFilters } from "@/lib/product-filter";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/feedback/states";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";

const skinTypes = ["العادية", "الجافة", "المختلطة", "غير متأكدة"];
const concerns = ["روتين أبسط", "إحساس بالراحة", "روتين مسائي"];

export function Catalog() {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams();
  const initial = Object.fromEntries(params.entries()) as ProductFilters;
  const [filters, setFilters] = useState<ProductFilters>(initial);
  const products = useMemo(() => filterAndSortProducts([...demoProducts], filters), [filters]);
  function update(key: keyof ProductFilters, value: string) { const next = { ...filters, [key]: value || undefined }; setFilters(next); const query = new URLSearchParams(); Object.entries(next).forEach(([k, v]) => { if (v) query.set(k, v); }); router.replace(`${pathname}${query.size ? `?${query}` : ""}`, { scroll: false }); }
  function clear() { setFilters({}); router.replace(pathname, { scroll: false }); }
  return <div className="catalog-layout"><aside className="catalog-filters" aria-label="تصفية المنتجات"><div className="filter-head"><div><p className="eyebrow">تصفية النتائج</p><h2>اختاري ما يهمك</h2></div><Button variant="ghost" onClick={clear}>مسح الكل</Button></div><FormField id="catalog-search" label="البحث"><Input id="catalog-search" type="search" value={filters.search ?? ""} onChange={(e) => update("search", e.target.value)} placeholder="اسم المنتج أو الفئة" /></FormField><FormField id="category" label="الفئة"><Select id="category" value={filters.category ?? ""} onChange={(e) => update("category", e.target.value)}><option value="">كل الفئات</option>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</Select></FormField><FormField id="skin-type" label="نوع البشرة"><Select id="skin-type" value={filters.skinType ?? ""} onChange={(e) => update("skinType", e.target.value)}><option value="">الكل</option>{skinTypes.map((item) => <option key={item}>{item}</option>)}</Select></FormField><FormField id="concern" label="الاهتمام"><Select id="concern" value={filters.concern ?? ""} onChange={(e) => update("concern", e.target.value)}><option value="">كل الاهتمامات</option>{concerns.map((item) => <option key={item}>{item}</option>)}</Select></FormField><FormField id="availability" label="التوفر"><Select id="availability" value={filters.availability ?? ""} onChange={(e) => update("availability", e.target.value)}><option value="">الكل</option><option value="available">متاح للمعاينة</option><option value="soon">قريبًا</option></Select></FormField></aside><div className="catalog-results"><div className="catalog-toolbar"><p aria-live="polite"><strong>{products.length}</strong> منتجات في المجموعة</p><FormField id="sort" label="الترتيب"><Select id="sort" value={filters.sort ?? "featured"} onChange={(e) => update("sort", e.target.value)}><option value="featured">المميزة أولًا</option><option value="price-asc">السعر: الأقل أولًا</option><option value="price-desc">السعر: الأعلى أولًا</option><option value="name">الاسم</option></Select></FormField></div>{products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <EmptyState title="لا توجد نتائج مطابقة" description="جرّبي إزالة بعض عوامل التصفية أو البحث بكلمة أخرى." />}</div></div>;
}
