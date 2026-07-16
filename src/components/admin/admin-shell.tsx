import Link from "next/link";
import type { UserRole } from "../../../generated/prisma/enums";
import { can, type Permission } from "@/server/auth/authorization";

const links: [string, string, Permission][] = [
  ["/admin", "نظرة عامة", "dashboard:view"],
  ["/admin/products", "المنتجات", "products:read"],
  ["/admin/categories", "التصنيفات والمكوّنات", "products:read"],
  ["/admin/inventory", "المخزون", "inventory:read"],
  ["/admin/orders", "الطلبات", "orders:read"],
  ["/admin/coupons", "القسائم", "coupons:write"],
  ["/admin/customers", "العملاء", "customers:read"],
  ["/admin/reviews", "المراجعات", "reviews:moderate"],
  ["/admin/assessments", "التقييمات", "assessments:read"],
  ["/admin/recommendations", "التوصيات", "recommendations:read"],
  ["/admin/content", "المحتوى", "content:write"],
  ["/admin/settings", "الإعدادات", "settings:write"],
  ["/admin/analytics", "التحليلات", "analytics:read"],
  ["/admin/audit-logs", "سجل التدقيق", "audit:read"],
];

export function AdminShell({ role, children }: { role: UserRole; children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="eyebrow">إدارة زيت كيكا</p>
        <h1>مركز التشغيل</h1>
        <span className="admin-role">{role}</span>
        <nav aria-label="أقسام الإدارة">
          {links.filter(([, , permission]) => can(role, permission)).map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <Link href="/account">العودة للحساب</Link>
      </aside>
      <section className="admin-workspace">{children}</section>
    </div>
  );
}

export function AdminHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <header className="admin-page-head">
      <div>
        <p className="eyebrow">لوحة الإدارة</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}

export function Metric({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return <article className="admin-metric"><span>{label}</span><strong>{value}</strong>{hint && <small>{hint}</small>}</article>;
}
