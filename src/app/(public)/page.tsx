import Image from "next/image";
import Link from "next/link";
import { brandValues, categories, demoProducts, faqs, uiText } from "@/constants/content";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { Alert } from "@/components/ui/alert";

const futureModules = [
  { number: "01", title: "مساعد البشرة الذكي", label: "قيد التخطيط", text: "حوار منظم يفهم الاحتياج، يطلب المعلومات الناقصة، ويشرح حدوده قبل أي اقتراح." },
  { number: "02", title: "اقتراحات أكثر ذكاءً", label: "قيد التخطيط", text: "مطابقة قابلة للتفسير بين إجابات العميلة وبيانات منتجات تعتمدها العلامة." },
  { number: "03", title: "استشارة مع مختص", label: "قيد التخطيط", text: "مسار إنساني واضح للحالات التي تحتاج خبرة، مع موافقة وخصوصية من البداية." },
  { number: "04", title: "مساحة العميلة", label: "قيد التخطيط", text: "مكان واحد للطلبات والمفضلة والرسائل بدل البحث في محادثات متفرقة." },
] as const;

export default function HomePage() {
  const featured = demoProducts.filter((product) => product.featured).slice(0, 4);
  return <>
    <section className="home-hero">
      <Image src="/images/hero-still-life.webp" alt="مجموعة عبوات زجاجية تجريبية غير موسومة مع قماش كريمي ونبات مجفف" fill priority sizes="100vw" />
      <div className="home-hero__veil" />
      <PageContainer className="home-hero__content">
        <p className="eyebrow">عناية تبدأ من المعلومة</p>
        <h1>اختاري بهدوء.<br /><em>وافهمي أكثر.</em></h1>
        <p>منصة عربية لزيت كيكا تجمع المنتجات والإرشاد والتواصل في تجربة واحدة، واضحة وجميلة وسهلة العودة إليها.</p>
        <div className="hero__actions"><Link className="link-button" href="/products">استكشفي المجموعة</Link><Link className="text-link" href="/presentation">شاهدي رؤية المنصة <span aria-hidden>←</span></Link></div>
        <div className="hero-signature" aria-label="مزايا العرض"><span>تجربة عربية أولًا</span><span>معلومة موثوقة</span><span>تواصل أكثر تنظيمًا</span></div>
      </PageContainer>
    </section>

    <section className="trust-strip reveal" aria-label="قيم التجربة"><PageContainer><div className="trust-grid">{brandValues.map((item, index) => <div key={item.title}><span>0{index + 1}</span><strong>{item.title}</strong><p>{item.text}</p></div>)}</div></PageContainer></section>

    <section className="section section--paper reveal"><PageContainer><div className="section-top"><SectionHeading eyebrow="مختارات زيت كيكا" title="مجموعة صغيرة، بحضور واضح" description="كل منتج يأخذ مساحته: صورته، فكرته، وطريقته داخل روتين العناية." /><Link className="text-link" href="/products">كل المنتجات <span aria-hidden>←</span></Link></div><div className="product-grid product-grid--featured">{featured.map((product) => <ProductCard key={product.slug} product={product} />)}</div></PageContainer></section>

    <section className="section reveal"><PageContainer><SectionHeading eyebrow="تصفحي بطريقتك" title="روتينك، بإيقاع يناسبك" description="ثلاث مداخل بسيطة تساعد العميلة على الوصول إلى ما تبحث عنه دون رسائل متكررة." /><div className="category-grid">{categories.map((category, index) => <Link className={`category-tile category-tile--${category.accent}`} href={`/products?category=${category.slug}`} key={category.slug}><span className="category-tile__number">0{index + 1}</span><div><h3>{category.name}</h3><p>{category.description}</p></div><span className="category-tile__arrow" aria-hidden>↙</span></Link>)}</div></PageContainer></section>

    <section className="editorial-split section--paper reveal"><div className="editorial-split__image"><Image src="/images/product-still-life.webp" alt="عبوة زيت زجاجية تجريبية غير موسومة في مشهد عناية محايد" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="editorial-split__copy"><p className="eyebrow">من سؤال متكرر إلى إجابة واضحة</p><h2>تجربة تختصر الطريق،<br />ولا تختصر المعلومة.</h2><p>بدل أن تبدأ كل عميلة من رسالة جديدة، تجد المجموعة والتفاصيل والأسئلة الشائعة في مكان واحد، ويصل للمالكة ما يحتاج فعلًا إلى رد شخصي.</p><ol className="number-list"><li><span>01</span>منتجات مرتبة وسهلة المقارنة</li><li><span>02</span>إجابات جاهزة للأسئلة المتكررة</li><li><span>03</span>تواصل بشري عندما يكون مهمًا</li></ol><Link className="link-button" href="/presentation">اكتشفي قيمة المنصة</Link></div></section>

    <section className="section future-section reveal"><PageContainer><div className="section-top"><SectionHeading eyebrow="القادم، بصورة مسؤولة" title="أربع تجارب ستنمو حول العميلة" description="ليست وعودًا جاهزة؛ إنها رؤية واضحة لما يمكن أن تصبح عليه تجربة زيت كيكا بعد اعتماد البيانات والسياسات." /><span className="future-stamp">رؤية مستقبلية</span></div><div className="future-grid">{futureModules.map((module) => <article className="future-card" key={module.title}><div><span className="future-card__number">{module.number}</span><span className="future-card__status">{module.label}</span></div><h3>{module.title}</h3><p>{module.text}</p><span className="future-card__line" aria-hidden /></article>)}</div></PageContainer></section>

    <section className="section section--cocoa reveal"><PageContainer><div className="consultation-preview"><div><p className="eyebrow">التقنية تنظّم. والإنسان يطمئن.</p><h2>حين تحتاج المسألة إلى خبرة، لا نقدّم تخمينًا.</h2><p>الرؤية المستقبلية توازن بين مساعد منظم ومختص مؤهل؛ كل واحد في موضعه، وكل انتقال مفهوم للعميلة.</p><Link className="link-button link-button--light" href="/skin-assessment">كيف سيعمل الدليل؟</Link></div><div className="consultation-orbit" aria-hidden><span>وضوح</span><span>موافقة</span><span>إحالة</span><i /></div></div></PageContainer></section>

    <section className="section reveal"><PageContainer><div className="story-band"><div><p className="eyebrow">علامة أقرب، وتشغيل أهدأ</p><h2>تجربة جميلة للعميلة، ووقت أوفر للمالكة.</h2></div><div><p>كل معلومة واضحة تقلل سؤالًا متكررًا. وكل مسار منظم يجعل التواصل أسرع وأكثر ثقة، من الاكتشاف وحتى الطلب مستقبلًا.</p><Link className="text-link" href="/about">اكتشفي مبادئ زيت كيكا <span aria-hidden>←</span></Link></div></div></PageContainer></section>

    <section className="section reveal"><PageContainer><div className="faq-preview"><SectionHeading eyebrow="وضوح من أول زيارة" title="أسئلة أقل. ثقة أكثر." /><div className="faq-list">{faqs.slice(0, 4).map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div><Link className="text-link" href="/faq">كل الأسئلة الشائعة <span aria-hidden>←</span></Link></div></PageContainer></section>

    <section className="section reveal"><PageContainer><div className="cta presentation-cta"><div><p className="eyebrow">زيت كيكا، بتجربة تليق بها</p><h2>من المحادثة إلى منصة تبني الثقة.</h2><p>استعرضي رحلة المنصة والقيمة التي تقدمها للعلامة والعميلة.</p></div><Link className="link-button link-button--light" href="/presentation">ابدئي العرض الخاص</Link></div><Alert title="نسخة عرض آمنة">{uiText.medicalNotice}</Alert></PageContainer></section>
  </>;
}
