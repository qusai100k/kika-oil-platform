import { AdminHeader } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/auth/authorization";
import { productReadinessRows } from "@/server/recommendation/service";

export default async function Page() {
  await requireAdmin("recommendations:read");
  const rows = await productReadinessRows();

  return (
    <>
      <AdminHeader title="جاهزية المنتجات للتوصية" description="المنتجات الناقصة تُستبعد من تشغيلات التوصية الحية حتى تكتمل معلوماتها الأساسية." />
      <div className="admin-grid">
        {rows.map((row) => (
          <article className="admin-panel" key={row.productId}>
            <h3>{row.nameAr}</h3>
            <p>{row.ready ? "جاهز للاستخدام التجريبي" : "غير جاهز"}</p>
            {row.missing.length > 0 && <ul>{row.missing.map((item) => <li key={item}>{item}</li>)}</ul>}
          </article>
        ))}
      </div>
    </>
  );
}
