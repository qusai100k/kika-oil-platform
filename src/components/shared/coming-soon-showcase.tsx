import Link from "next/link";
import { PageContainer } from "@/components/shared/page-container";

export function ComingSoonShowcase({ eyebrow, title, description, steps, primaryHref = "/", primaryLabel = "العودة إلى التجربة" }: { eyebrow: string; title: string; description: string; steps: Array<{ title: string; text: string }>; primaryHref?: string; primaryLabel?: string }) {
  return <PageContainer><section className="coming-showcase"><div className="coming-showcase__copy"><span className="coming-showcase__status">قريبًا</span><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p><div className="hero__actions"><Link className="link-button" href={primaryHref}>{primaryLabel}</Link><Link className="text-link" href="/presentation">شاهدي الرؤية الكاملة <span aria-hidden>←</span></Link></div></div><div className="coming-showcase__preview" aria-label="معاينة للمزايا المستقبلية">{steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><div><h2>{step.title}</h2><p>{step.text}</p></div></article>)}</div></section></PageContainer>;
}
