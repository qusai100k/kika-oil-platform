import Link from "next/link";
import { notFound } from "next/navigation";
import { addRecommendationItemToCartAction } from "@/server/recommendation/actions";
import { ownedRecommendation } from "@/server/recommendation/service";
import { requireSession } from "@/server/auth/session";
import { formatPrice } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ recommendationId: string }> }) {
  const { user } = await requireSession();
  const { recommendationId } = await params;
  let recommendation;
  try {
    recommendation = await ownedRecommendation(user.id, recommendationId);
  } catch {
    notFound();
  }
  const primary = recommendation.items.find((item) => item.role === "PRIMARY") ?? recommendation.items[0];

  return (
    <section className="assessment-shell assessment-result">
      <p className="eyebrow">إرشاد منتجات حتمي</p>
      <h1>{recommendation.status === "GENERATED" ? "نتيجة مطابقة المنتجات" : "لم يتم عرض منتج تلقائيًا"}</h1>
      <p>{recommendation.explanationAr}</p>
      <div className="assessment-safety">{recommendation.safetyNoticeAr}</div>
      <dl>
        <div><dt>الحالة</dt><dd>{recommendation.status}</dd></div>
        <div><dt>نسخة الإعدادات</dt><dd>v{recommendation.configVersion}</dd></div>
        <div><dt>المحرك</dt><dd>{recommendation.engineVersion}</dd></div>
      </dl>
      {primary && (
        <article className="admin-panel">
          <p className="eyebrow">الاختيار الأساسي</p>
          <h2>{primary.product.nameAr}</h2>
          <p>{primary.explanationAr}</p>
          <p>قوة المطابقة: {primary.matchLevel} · score {primary.score}</p>
          {primary.variant && <p>{primary.variant.sizeLabel ?? primary.variant.nameAr} · {formatPrice(Number(primary.variant.price), primary.variant.currency)} · المخزون {primary.variant.stock}</p>}
          <div className="assessment-actions">
            <Link className="link-button" href={`/products/${primary.product.slug}`}>فتح تفاصيل المنتج</Link>
            {primary.variantId && <form action={addRecommendationItemToCartAction.bind(null, recommendation.id, primary.id)}><button className="button">إضافة هذا الاختيار للسلة</button></form>}
          </div>
        </article>
      )}
      {recommendation.items.filter((item) => item.id !== primary?.id).length > 0 && (
        <section>
          <h2>بدائل مناسبة</h2>
          <div className="assessment-history">
            {recommendation.items.filter((item) => item.id !== primary?.id).map((item) => (
              <article key={item.id}>
                <div><b>{item.product.nameAr}</b><span>{item.matchLevel} · score {item.score}</span></div>
                <Link href={`/products/${item.product.slug}`}>تفاصيل المنتج</Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <Link href="/account/recommendations">كل الإرشادات</Link>
    </section>
  );
}
