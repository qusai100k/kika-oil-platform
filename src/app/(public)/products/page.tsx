import type { Metadata } from "next";
import { Suspense } from "react";
import { uiText } from "@/constants/content";
import { PageContainer } from "@/components/shared/page-container";
import { Catalog } from "@/components/product/catalog";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
export const metadata: Metadata = { title: "مجموعة زيت كيكا", description: "استعرضي مجموعة زيت كيكا مع بحث وتصفية واضحة، دون ادعاءات طبية أو تجارية معتمدة.", alternates: { canonical: "/products" } };
export default function ProductsPage() { return <PageContainer><header className="page-hero page-hero--catalog"><p className="eyebrow">مجموعة قابلة للاستكشاف</p><h1>اختيارات مرتبة،<br />ومعلومة أوضح.</h1><p>ابحثي وصفّي منتجات العرض حسب الفئة والتفضيل. الأسعار والتوافقات المعروضة مبدئية حتى اعتماد الكتالوج الرسمي.</p></header><Alert title="نسخة العرض الخاص">{uiText.demoNotice}</Alert><section className="section"><Suspense fallback={<div className="grid-3"><Skeleton /><Skeleton /><Skeleton /></div>}><Catalog /></Suspense></section></PageContainer>; }
