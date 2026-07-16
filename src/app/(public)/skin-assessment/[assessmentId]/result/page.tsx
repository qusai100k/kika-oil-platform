import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { reopenNeedsInformationAction } from "@/server/assessment/actions";
import { ownedAssessment } from "@/server/assessment/service";
import { requireSession } from "@/server/auth/session";
import { generateRecommendationAction } from "@/server/recommendation/actions";

export default async function Page({ params }: { params: Promise<{ assessmentId: string }> }) {
  const { user } = await requireSession();
  const { assessmentId } = await params;
  let assessment;
  try {
    assessment = await ownedAssessment(user.id, assessmentId);
  } catch {
    notFound();
  }
  if (assessment.status === "DRAFT") redirect(`/skin-assessment/${assessment.id}`);
  const needs = assessment.resultStatus === "NEEDS_MORE_INFORMATION";
  const referred = assessment.resultStatus === "REFER_TO_SPECIALIST";

  return (
    <section className="assessment-shell assessment-result">
      <p className="eyebrow">نتيجة تنظيم الإجابات</p>
      <h1>{referred ? "المراجعة المهنية أكثر أمانًا" : needs ? "نحتاج توضيح بعض المعلومات" : "جاهز لإرشاد المنتجات الحتمي"}</h1>
      <p>{assessment.resultMessageAr}</p>
      {needs && (
        <div className="assessment-safety">
          <strong>الخطوة التالية</strong>
          <span>راجعي القسم المناسب وصححي الإجابة غير المؤكدة. ستعاد قواعد التحقق على نفس التقييم دون إنشاء تقييم مكرر.</span>
        </div>
      )}
      {referred && (
        <div className="assessment-safety">
          <strong>خطوة آمنة مقترحة</strong>
          <span>توقفي عن تجربة منتج جديد على موضع القلق، واطلبي رأي مختص مؤهل. لا تتضمن هذه النتيجة تشخيصًا أو علاجًا أو توصية بزيت.</span>
        </div>
      )}
      <div className="assessment-safety">هذه ليست نتيجة تشخيصية ولا ضمانًا للملاءمة. لا توجد توصية طبية أو حجز مختص في هذه المرحلة.</div>
      <dl>
        <div><dt>تاريخ التقديم</dt><dd>{assessment.submittedAt?.toLocaleDateString("ar-EG")}</dd></div>
        <div><dt>نسخة القالب</dt><dd>{assessment.questionnaireVersion} - مبدئية</dd></div>
        <div><dt>الحالة</dt><dd>{assessment.resultStatus}</dd></div>
      </dl>
      <div className="assessment-actions">
        {needs && <form action={reopenNeedsInformationAction.bind(null, assessment.id)}><button className="button">استكمال المعلومات في القسم المناسب</button></form>}
        {!needs && !referred && <form action={generateRecommendationAction.bind(null, assessment.id)}><button className="button">توليد إرشاد منتج حتمي</button></form>}
        <Link className="link-button" href="/account/assessments">سجل تقييماتي</Link>
      </div>
    </section>
  );
}
