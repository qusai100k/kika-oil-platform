import { Card } from "@/components/ui/card";
export function EmptyState({ title = "لا توجد نتائج", description = "جرّبي العودة لاحقًا أو تغيير اختيارك.", headingLevel = 2 }: { title?: string; description?: string; headingLevel?: 1 | 2 }) { const Heading = headingLevel === 1 ? "h1" : "h2"; return <Card className="state"><span aria-hidden>◇</span><Heading>{title}</Heading><p>{description}</p></Card>; }
export function ErrorState({ title = "تعذر إكمال الطلب", description = "حاولي مرة أخرى، وإذا استمر الخطأ تواصلي معنا." }) { return <Card className="state state--error"><span aria-hidden>!</span><h2>{title}</h2><p>{description}</p></Card>; }
export function SuccessMessage({ children }: { children: React.ReactNode }) { return <div className="success-message" role="status">✓ {children}</div>; }
