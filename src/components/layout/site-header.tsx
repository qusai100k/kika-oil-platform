import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageContainer } from "@/components/shared/page-container";
import { Dropdown } from "@/components/ui/dropdown";
import { getSession } from "@/server/auth/session";

export async function SiteHeader() {
  const session = await getSession();
  return <header className="site-header">
    <div className="announcement"><span>تصوّر تجربة زيت كيكا — نسخة العرض الخاص</span><Link href="/presentation">استعرضي الرؤية <span aria-hidden>←</span></Link></div>
    <PageContainer className="header-inner">
      <Link className="brand" href="/" aria-label="العودة إلى الرئيسية"><span className="brand__mark">ك</span><span><strong>زيت كيكا</strong><small>عناية بهدوء ووضوح</small></span></Link>
      <nav className="desktop-nav" aria-label="التنقل الرئيسي">{siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <div className="header-actions">
        <Link href="/products" aria-label="البحث في المنتجات"><span className="nav-icon nav-icon--search" aria-hidden /></Link>
        <Link href={session ? "/account" : "/login"} aria-label={session ? "الحساب الشخصي" : "تسجيل الدخول"}><span className="nav-icon nav-icon--account" aria-hidden /></Link>
        <Link href="/cart" aria-label="السلة — قريبًا"><span className="nav-icon nav-icon--bag" aria-hidden /></Link>
        <div className="mobile-menu"><Dropdown label="القائمة">{siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link className="presentation-menu-link" href="/presentation">رؤية المنصة</Link></Dropdown></div>
      </div>
    </PageContainer>
  </header>;
}
