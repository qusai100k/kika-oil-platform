import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageContainer } from "@/components/shared/page-container";
import { Dropdown } from "@/components/ui/dropdown";
import { getSession } from "@/server/auth/session";
import { getCartSummary } from "@/server/commerce/cart";

function HeaderIcon({ name }: { name: "search" | "account" | "bag" }) {
  if (name === "search") {
    return (
      <svg className="header-action__svg" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.75" />
        <path d="m15 15 4.5 4.5" />
      </svg>
    );
  }

  if (name === "account") {
    return (
      <svg className="header-action__svg" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8.25" r="3.4" />
        <path d="M5.8 19.25c1.25-3.45 3.25-5.15 6.2-5.15s4.95 1.7 6.2 5.15" />
      </svg>
    );
  }

  return (
    <svg className="header-action__svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.25 9.25h9.5l-.65 10H7.9l-.65-10Z" />
      <path d="M9.25 9.25V7.8A2.75 2.75 0 0 1 12 5.05a2.75 2.75 0 0 1 2.75 2.75v1.45" />
    </svg>
  );
}

export async function SiteHeader() {
  const session = await getSession();
  const cartCount = session ? (await getCartSummary(session.user.id)).itemCount : 0;

  return (
    <header className="site-header">
      <div className="announcement">
        <span>تصوّر تجربة زيت كيكا — نسخة العرض الخاص</span>
        <Link href="/presentation">استعرضي الرؤية <span aria-hidden>←</span></Link>
      </div>
      <PageContainer className="header-inner">
        <Link className="brand" href="/" aria-label="العودة إلى الرئيسية">
          <span className="brand__mark">ك</span>
          <span>
            <strong>زيت كيكا</strong>
            <small>عناية بهدوء ووضوح</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>

        <div className="header-actions" aria-label="روابط سريعة">
          <Link className="header-action" href="/products" aria-label="البحث في المنتجات">
            <HeaderIcon name="search" />
            <span className="header-action__label">بحث</span>
          </Link>
          <Link className="header-action" href={session ? "/account" : "/login"} aria-label={session ? "الحساب الشخصي" : "تسجيل الدخول"}>
            <HeaderIcon name="account" />
            <span className="header-action__label">حسابي</span>
          </Link>
          <Link className="header-action" href="/cart" aria-label={`السلة — ${cartCount} قطعة`}>
            <HeaderIcon name="bag" />
            <span className="header-action__label">السلة</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <div className="mobile-menu">
            <Dropdown label="القائمة">
              {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <Link className="presentation-menu-link" href="/presentation">رؤية المنصة</Link>
            </Dropdown>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
