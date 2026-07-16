import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/auth/authorization";
import { getDb } from "@/server/db/client";

export default async function Page() {
  await requireAdmin("recommendations:read");
  const rows = await getDb().recommendation.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: true, items: { orderBy: { rank: "asc" }, include: { product: true } } },
  });

  return (
    <>
      <AdminHeader title="تشغيلات التوصيات" description="تعرض الحالة والنتيجة دون نشر إجابات التقييم الحساسة في قائمة عامة." />
      <div className="admin-table">
        <div className="admin-tr admin-th"><span>العميل</span><span>الحالة</span><span>الإعداد</span><span>المنتج الأول</span><span>التاريخ</span></div>
        {rows.map((row) => (
          <Link className="admin-tr" href={`/admin/recommendations/runs/${row.id}`} key={row.id}>
            <span>{row.user.name ?? row.user.email}</span>
            <span>{row.status}</span>
            <span>v{row.configVersion}</span>
            <span>{row.items[0]?.product.nameAr ?? "لا يوجد"}</span>
            <time>{row.createdAt.toLocaleDateString("ar-EG")}</time>
          </Link>
        ))}
      </div>
    </>
  );
}
