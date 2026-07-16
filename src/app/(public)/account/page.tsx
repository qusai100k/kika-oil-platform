import type { Metadata } from "next";
import { ComingSoonShowcase } from "@/components/shared/coming-soon-showcase";

export const metadata: Metadata = { title: "مساحة العميلة — قريبًا", description: "تصوّر لمساحة عميلة زيت كيكا المستقبلية للطلبات والمفضلة والتواصل.", alternates: { canonical: "/account" }, robots: { index: false, follow: false } };
export default function AccountPlaceholder() { return <ComingSoonShowcase eyebrow="مساحة تعرف ما يهمك" title="كل رحلتك مع زيت كيكا، في مكان واحد." description="تصوّر لمساحة شخصية هادئة تحفظ ما تختارينه وتجمع طلباتك ورسائلك دون أن تضيع التفاصيل بين المحادثات." primaryHref="/products" primaryLabel="استكشفي المجموعة" steps={[{ title: "اختيارات محفوظة", text: "عودة سهلة إلى المنتجات التي لفتت انتباهك." }, { title: "طلبات أوضح", text: "حالة كل طلب وتفاصيله في مسار واحد." }, { title: "تواصل بسياق", text: "رسائلك مرتبطة بما تسألين عنه، دون إعادة التفاصيل." }]} />; }
