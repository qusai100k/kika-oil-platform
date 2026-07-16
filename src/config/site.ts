export const siteConfig = {
  name: "منصة زيت كيكا",
  nameEn: "Kika Oil Platform",
  description: "مساحة عربية تجريبية لاكتشاف منتجات العناية وفهم تجربة الإرشاد المستقبلية بأمان ووضوح.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "المنتجات" },
    { href: "/skin-assessment", label: "دليل الاختيار" },
    { href: "/about", label: "من نحن" },
    { href: "/faq", label: "الأسئلة الشائعة" },
    { href: "/contact", label: "تواصلي معنا" },
  ],
} as const;
