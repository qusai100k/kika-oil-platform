import Link from "next/link";
import { AdminHeader, Metric } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/auth/authorization";
import { getDb } from "@/server/db/client";

export default async function Page() {
  await requireAdmin("recommendations:read");
  const db = getDb();
  const [total, generated, noResult, configs] = await Promise.all([
    db.recommendation.count(),
    db.recommendation.count({ where: { status: "GENERATED" } }),
    db.recommendation.count({ where: { status: { in: ["NO_ELIGIBLE_PRODUCT", "WITHHELD_FOR_SAFETY", "NEEDS_HUMAN_REVIEW", "INSUFFICIENT_PRODUCT_DATA"] } } }),
    db.recommendationConfig.findMany({ orderBy: { version: "desc" }, take: 5 }),
  ]);

  return (
    <>
      <AdminHeader title="إدارة التوصيات" description="محرك حتمي تجريبي لا يستخدم الذكاء الاصطناعي ولا يصدر تشخيصًا طبيًا." />
      <div className="admin-metrics">
        <Metric label="إجمالي التشغيلات" value={total} />
        <Metric label="توصيات مولدة" value={generated} />
        <Metric label="حالات بلا منتج" value={noResult} />
      </div>
      <div className="admin-grid">
        <section className="admin-panel">
          <h3>مسارات الإدارة</h3>
          <div className="admin-actions">
            <Link href="/admin/recommendations/configurations">الإعدادات</Link>
            <Link href="/admin/recommendations/runs">التشغيلات</Link>
            <Link href="/admin/recommendations/readiness">جاهزية المنتجات</Link>
          </div>
        </section>
        <section className="admin-panel">
          <h3>آخر الإعدادات</h3>
          {configs.map((config) => (
            <div className="admin-row" key={config.id}>
              <b>{config.nameAr}</b>
              <span>v{config.version}</span>
              <span>{config.status}</span>
              <span>{config.approvalStatus}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
