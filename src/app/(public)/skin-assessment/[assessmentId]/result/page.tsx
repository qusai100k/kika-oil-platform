import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {reopenNeedsInformationAction} from "@/server/assessment/actions";
import {ownedAssessment} from "@/server/assessment/service";
import {requireSession} from "@/server/auth/session";

export default async function Page({params}:{params:Promise<{assessmentId:string}>}){
  const {user}=await requireSession(),{assessmentId}=await params;let a;
  try{a=await ownedAssessment(user.id,assessmentId)}catch{notFound()}
  if(a.status==="DRAFT")redirect(`/skin-assessment/${a.id}`);
  const needs=a.resultStatus==="NEEDS_MORE_INFORMATION", referred=a.resultStatus==="REFER_TO_SPECIALIST";
  return <section className="assessment-shell assessment-result">
    <p className="eyebrow">نتيجة تنظيم الإجابات</p>
    <h1>{referred?"المراجعة المهنية أكثر أمانًا":needs?"نحتاج توضيح بعض المعلومات":"جاهز للمرحلة المستقبلية"}</h1>
    <p>{a.resultMessageAr}</p>
    {needs&&<div className="assessment-safety"><strong>الخطوة التالية</strong><span>راجعي إجابات قسم التاريخ والسلامة، وصححي الإجابة غير المؤكدة أو أضيفي التفصيل المطلوب. ستُعاد قواعد التحقق على نفس التقييم دون إنشاء تقييم مكرر، وتبقى المحاولة السابقة محفوظة للرجوع.</span></div>}
    {referred&&<div className="assessment-safety"><strong>خطوة آمنة مقترحة</strong><span>توقفي عن تجربة منتج جديد على المنطقة موضع القلق، واطلبي رأي مختص مؤهل أو مقدم رعاية مناسب. لا تتضمن هذه النتيجة تشخيصًا أو علاجًا أو توصية بزيت.</span></div>}
    <div className="assessment-safety">هذه ليست نتيجة تشخيصية ولا ضمانًا للملاءمة. لا توجد توصية بمنتج أو زيت، وحجز المختص غير مفعّل في هذه المرحلة.</div>
    <dl><div><dt>تاريخ التقديم</dt><dd>{a.submittedAt?.toLocaleDateString("ar-EG")}</dd></div><div><dt>نسخة القالب</dt><dd>{a.questionnaireVersion} — مبدئية</dd></div><div><dt>الحالة</dt><dd>{a.resultStatus}</dd></div></dl>
    <div className="assessment-actions">{needs&&<form action={reopenNeedsInformationAction.bind(null,a.id)}><button className="button">استكمال المعلومات في القسم المناسب</button></form>}<Link className="link-button" href="/account/assessments">سجل تقييماتي</Link></div>
  </section>;
}
