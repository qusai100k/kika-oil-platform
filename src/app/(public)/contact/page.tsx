import type { Metadata } from "next";
import Link from "next/link";
import { contactInfo } from "@/constants/content";
import { PageContainer } from "@/components/shared/page-container";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
export const metadata: Metadata = { title: "تواصلي معنا", description: "قنوات تواصل ونموذج رسالة لمنصة زيت كيكا.", alternates: { canonical: "/contact" } };
export default function ContactPage() { return <PageContainer><header className="page-hero"><p className="eyebrow">نحن هنا للاستماع</p><h1>كيف يمكننا مساعدتك؟</h1><p>نستعرض هنا كيف تصل أسئلة العميلات إلى زيت كيكا في قناة واضحة ومنظمة.</p></header><section className="section contact-layout"><div className="contact-channels"><Card className="contact-card"><span>01</span><h2>WhatsApp</h2><p>{contactInfo.phone}</p></Card><Card className="contact-card"><span>02</span><h2>Instagram</h2><p>{contactInfo.instagram}</p></Card><Card className="contact-card"><span>03</span><h2>البريد والساعات</h2><p>{contactInfo.email}</p><p>{contactInfo.hours}</p></Card><p>قد تجدين الإجابة بالفعل في <Link className="text-link" href="/faq">الأسئلة الشائعة ←</Link></p></div><Card className="contact-form-card"><p className="eyebrow">رسالتك إلى زيت كيكا</p><h2>اكتبي رسالتك</h2><p>لا تضيفي معلومات صحية حساسة؛ تُفعّل قناة الإرسال الرسمية قبل الإطلاق.</p><ContactForm /></Card></section></PageContainer>; }
