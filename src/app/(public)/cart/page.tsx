import type { Metadata } from "next";
import { ComingSoonShowcase } from "@/components/shared/coming-soon-showcase";

export const metadata: Metadata = { title: "تجربة الطلب — قريبًا", description: "تصوّر لمسار طلب زيت كيكا المستقبلي الواضح والمنظم.", alternates: { canonical: "/cart" }, robots: { index: false, follow: false } };
export default function CartPlaceholder() { return <ComingSoonShowcase eyebrow="طلب واضح من البداية" title="من الاختيار إلى التأكيد، بلا رسائل متفرقة." description="عندما تُعتمد التجارة والشحن، ستتحول السلة إلى مسار بسيط يجمع المنتج والعنوان والتوصيل والتأكيد في تجربة واحدة." primaryHref="/products" primaryLabel="اختاري منتجًا للعرض" steps={[{ title: "راجعي اختيارك", text: "الحجم والسعر والتوفر في ملخص واضح." }, { title: "أدخلي التفاصيل", text: "عنوان وتوصيل ضمن خطوات قصيرة ومفهومة." }, { title: "تابعي الطلب", text: "تأكيد وحالة يمكن الرجوع إليهما في أي وقت." }]} />; }
