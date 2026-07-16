import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader, Metric } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/auth/authorization";
import { getDb } from "@/server/db/client";

export default async function Page({ params }: { params: Promise<{ recommendationId: string }> }) {
  await requireAdmin("recommendations:read");
  const { recommendationId } = await params;
  const recommendation = await getDb().recommendation.findUnique({
    where: { id: recommendationId },
    include: {
      user: true,
      assessment: { select: { id: true, status: true, resultStatus: true } },
      items: {
        orderBy: { rank: "asc" },
        include: { product: true, variant: true },
      },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!recommendation) notFound();

  return (
    <>
      <AdminHeader
        title="تفاصيل تشغيل التوصية"
        description="ملخص إداري آمن لنتيجة المحرك الحتمي، دون عرض إجابات التقييم الحساسة أو أي تشخيص طبي."
        action={<Link href="/admin/recommendations/runs">العودة للتشغيلات</Link>}
      />

      <div className="admin-metrics">
        <Metric label="الحالة" value={recommendation.status} />
        <Metric label="إصدار الإعداد" value={`v${recommendation.configVersion}`} />
        <Metric label="عدد المنتجات" value={recommendation.items.length} />
      </div>

      <section className="admin-panel">
        <h3>بيانات التشغيل</h3>
        <div className="admin-row"><b>العميل</b><span>{recommendation.user.name ?? recommendation.user.email}</span></div>
        <div className="admin-row"><b>التقييم</b><span>{recommendation.assessment.status} · {recommendation.assessment.resultStatus}</span></div>
        <div className="admin-row"><b>المحرك</b><span>{recommendation.engineVersion}</span></div>
        <div className="admin-row"><b>تاريخ التشغيل</b><time>{recommendation.createdAt.toLocaleString("ar-EG")}</time></div>
        {recommendation.explanationAr && <p>{recommendation.explanationAr}</p>}
      </section>

      <div className="admin-grid">
        {recommendation.items.map((item) => (
          <article className="admin-panel" key={item.id}>
            <p className="eyebrow">ترتيب {item.rank} · {item.role}</p>
            <h3>{item.product.nameAr}</h3>
            <p>{item.variant?.nameAr ?? "النسخة الأساسية"} · درجة {item.score}/100 · {item.matchLevel}</p>
            <p>{item.explanationAr}</p>
            {item.scoreContributions && (
              <pre className="admin-code">{JSON.stringify(item.scoreContributions, null, 2)}</pre>
            )}
          </article>
        ))}
      </div>

      <section className="admin-panel">
        <h3>سجل الحالة</h3>
        {recommendation.statusHistory.map((entry) => (
          <div className="admin-row" key={entry.id}>
            <b>{entry.fromStatus ?? "START"} → {entry.toStatus}</b>
            <span>{entry.noteAr ?? "تحديث تلقائي"}</span>
            <time>{entry.createdAt.toLocaleString("ar-EG")}</time>
          </div>
        ))}
      </section>
    </>
  );
}
