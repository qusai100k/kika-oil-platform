import Link from "next/link";
import { requireSession } from "@/server/auth/session";
import { recommendationsForUser } from "@/server/recommendation/service";

export default async function Page() {
  const { user } = await requireSession();
  const rows = await recommendationsForUser(user.id);
  return (
    <>
      <div className="account-page-head">
        <div>
          <h2>إرشادات المنتجات</h2>
          <p>نتائج حتمية مبنية على تقييماتك المكتملة ومعلومات منتجات تطويرية. لا توجد توصية طبية أو تشخيص.</p>
        </div>
        <Link className="button" href="/account/assessments">تقييماتي</Link>
      </div>
      {rows.length ? (
        <div className="assessment-history">
          {rows.map((row) => (
            <article key={row.id}>
              <div>
                <b>{row.status}</b>
                <span>{row.createdAt.toLocaleDateString("ar-EG")} · config v{row.configVersion} · {row.items[0]?.product.nameAr ?? "لا يوجد منتج"}</span>
              </div>
              <Link href={`/account/recommendations/${row.id}`}>عرض الإرشاد</Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="future-account">
          <h3>لا توجد إرشادات بعد</h3>
          <p>عند تقديم تقييم جاهز يمكنك توليد إرشاد منتج حتمي من صفحة نتيجة التقييم.</p>
        </div>
      )}
    </>
  );
}
