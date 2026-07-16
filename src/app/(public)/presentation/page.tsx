import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/shared/page-container";

export const metadata: Metadata = {
  title: "رؤية منصة زيت كيكا",
  description: "عرض خاص يشرح كيف تنقل منصة زيت كيكا تجربة العميلة من المحادثات المتفرقة إلى رحلة واضحة ومتكاملة.",
  alternates: { canonical: "/presentation" },
  robots: { index: false, follow: false },
};

const journey = [
  { number: "01", title: "تكتشف", text: "تصل العميلة إلى علامة لها حضور واضح، وتفهم المجموعة من أول زيارة." },
  { number: "02", title: "تفهم", text: "تقرأ تفاصيل المنتج والأسئلة الشائعة دون انتظار رد على كل سؤال." },
  { number: "03", title: "تختار", text: "يُنظم دليل مستقبلي احتياجها ويشرح سبب أي اقتراح أو إحالة." },
  { number: "04", title: "تتواصل", text: "تصل الرسالة الصحيحة إلى القناة الصحيحة، مع سياق أوضح للمالكة." },
  { number: "05", title: "تطلب", text: "تنتقل مستقبلًا إلى طلب منظم بدل جمع التفاصيل يدويًا داخل المحادثة." },
] as const;

const outcomes = [
  ["وقت أقل في التكرار", "المنتجات والسياسات والإجابات الأساسية تبقى متاحة دائمًا."],
  ["ثقة أعلى", "تفاصيل واضحة وحدود صريحة تجعل التجربة أكثر مهنية."],
  ["قرار أسهل", "البحث والتصفية والمقارنة تقلل الحيرة وتقرّب الاختيار."],
  ["نمو قابل للتنظيم", "كل تجربة مستقبلية تُبنى حول بيانات ومسارات يمكن قياسها وتحسينها."],
] as const;

export default function PresentationPage() {
  return <div className="presentation-page">
    <section className="presentation-hero"><PageContainer><div className="presentation-hero__index">رؤية 2026 <span>عرض خاص</span></div><p className="eyebrow">منصة صُممت حول طريقة عمل زيت كيكا</p><h1>من رسائل متفرقة،<br />إلى تجربة تبني الثقة.</h1><p className="presentation-hero__lead">مكان واحد يجمع اكتشاف المنتجات، المعلومة، الإرشاد، والتواصل — ويمنح العلامة مساحة تنمو بهدوء.</p><div className="hero__actions"><Link className="link-button" href="/products">شاهدي تجربة المنتجات</Link><a className="text-link" href="#value">لماذا هذه المنصة؟ <span aria-hidden>←</span></a></div></PageContainer></section>

    <section className="presentation-problem reveal" id="value"><PageContainer><div className="presentation-statement"><span>قبل</span><h2>كل سؤال يبدأ من الصفر.</h2><p>اسم المنتج، السعر، الاستخدام، الشحن، والمتابعة تعود في محادثات مختلفة، ويصعب على العميلة الرجوع إلى الإجابة.</p></div><div className="presentation-divider" aria-hidden>←</div><div className="presentation-statement presentation-statement--after"><span>مع المنصة</span><h2>كل إجابة تصبح جزءًا من التجربة.</h2><p>تصل العميلة للمعلومة بنفسها، وتبقى المحادثة للحالات التي تستحق اهتمامًا شخصيًا.</p></div></PageContainer></section>

    <section className="section section--paper reveal"><PageContainer><div className="section-heading"><p className="eyebrow">رحلة واحدة، من أول اهتمام</p><h2>كيف ترى العميلة زيت كيكا؟</h2><p>تجربة مترابطة بدل خطوات منفصلة بين الصفحة والرسائل والذاكرة.</p></div><div className="journey-line">{journey.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></PageContainer></section>

    <section className="section reveal"><PageContainer><div className="presentation-outcomes"><div><p className="eyebrow">قيمة واضحة للعلامة</p><h2>ليست واجهة أجمل فقط.<br />إنها طريقة عمل أهدأ.</h2></div><div className="outcome-list">{outcomes.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></PageContainer></section>

    <section className="section section--cocoa reveal"><PageContainer><div className="presentation-future"><p className="eyebrow">كيف تنمو التجربة لاحقًا؟</p><h2>الذكاء الاصطناعي لا يحل محل العلاقة.<br />بل يجعلها أكثر تنظيمًا.</h2><div className="future-flow"><article><span>01</span><h3>يفهم السؤال</h3><p>يجمع إجابات منظمة بدل التخمين من رسالة قصيرة.</p></article><article><span>02</span><h3>يراجع الحدود</h3><p>يتوقف عند النقص أو إشارات السلامة قبل أي مطابقة.</p></article><article><span>03</span><h3>يشرح الاقتراح</h3><p>يعرض السبب بالاستناد إلى بيانات تعتمدها العلامة.</p></article><article><span>04</span><h3>يصل إلى الإنسان</h3><p>يحيل إلى مختص أو تواصل مباشر عندما يكون ذلك أنسب.</p></article></div></div></PageContainer></section>

    <section className="section reveal"><PageContainer><div className="presentation-close"><span className="presentation-close__mark">ك</span><p className="eyebrow">الرؤية</p><h2>أن تشعر كل عميلة أن زيت كيكا تعرف كيف تستقبلها، وتجيبها، وترافق اختيارها.</h2><p>هذه النسخة بداية قابلة للتطوير، بانتظار هوية العلامة ومحتواها الحقيقي.</p><div className="hero__actions"><Link className="link-button" href="/">العودة إلى تجربة الموقع</Link><Link className="text-link" href="/contact">شاهدي نقطة التواصل <span aria-hidden>←</span></Link></div></div></PageContainer></section>
  </div>;
}
