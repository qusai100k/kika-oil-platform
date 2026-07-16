import { AdminHeader } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/server/auth/authorization";
import { getDb } from "@/server/db/client";
import { archiveRecommendationConfigAction, createRecommendationConfigAction, duplicateRecommendationConfigAction, publishRecommendationConfigAction } from "@/server/recommendation/admin-actions";
import { validateRecommendationConfig } from "@/server/recommendation/admin";

export default async function Page() {
  const { role } = await requireAdmin("recommendations:read");
  const rows = await getDb().recommendationConfig.findMany({ include: { weights: true, explanationTemplates: true }, orderBy: [{ key: "asc" }, { version: "desc" }] });
  const configure = ["STORE_OWNER", "ADMIN", "SUPER_ADMIN"].includes(role);

  return (
    <>
      <AdminHeader title="إعدادات محرك التوصيات" description="الإصدار المنشور لا يُعدّل في مكانه. كل تغيير يبدأ بنسخة مسودة قابلة للمراجعة." />
      {configure && (
        <section className="admin-panel">
          <h3>إنشاء مسودة</h3>
          <form className="admin-form compact" action={createRecommendationConfigAction}>
            <label>الاسم<input name="nameAr" required defaultValue="إعداد توصيات مبدئي - DEVELOPMENT ONLY" /></label>
            <button>إنشاء</button>
          </form>
        </section>
      )}
      <div className="admin-grid">
        {await Promise.all(rows.map(async (row) => {
          const errors = await validateRecommendationConfig(row.id);
          return (
            <article className="admin-panel" id={row.id} key={row.id}>
              <h3>{row.nameAr} - v{row.version}</h3>
              <p>{row.status} · {row.approvalStatus} · {row.isProvisional ? "PROVISIONAL" : "APPROVED"}</p>
              <p>{errors.length ? errors.join(" | ") : "اجتاز فحص البنية"}</p>
              <div className="admin-actions">
                {configure && <form action={duplicateRecommendationConfigAction.bind(null, row.id)}><button>نسخ إلى مسودة</button></form>}
                {configure && row.status === "DRAFT" && <form action={publishRecommendationConfigAction.bind(null, row.id)}><input name="confirmation" placeholder={`PUBLISH REC v${row.version}`} required /><button>نشر مؤقت</button></form>}
                {configure && row.status !== "ARCHIVED" && <form action={archiveRecommendationConfigAction.bind(null, row.id)}><input name="confirmation" placeholder={`ARCHIVE REC v${row.version}`} required /><button>أرشفة</button></form>}
              </div>
            </article>
          );
        }))}
      </div>
    </>
  );
}
