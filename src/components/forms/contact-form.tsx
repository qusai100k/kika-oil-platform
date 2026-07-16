"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/forms/form-field";
import { SuccessMessage } from "@/components/feedback/states";
import { contactSchema, type ContactInput } from "@/schemas/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { reason: "product" } });
  return <form className="contact-form" noValidate onChange={() => { if (submitted) setSubmitted(false); }} onSubmit={handleSubmit(async () => { setSubmitted(true); })}>
    <FormField id="name" label="الاسم" error={errors.name?.message}><Input id="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} /></FormField>
    <FormField id="email" label="البريد الإلكتروني" error={errors.email?.message}><Input id="email" type="email" autoComplete="email" inputMode="email" dir="ltr" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} /></FormField>
    <FormField id="phone" label="الهاتف (اختياري)" error={errors.phone?.message}><Input id="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} /></FormField>
    <FormField id="reason" label="سبب التواصل" error={errors.reason?.message}><Select id="reason" {...register("reason")}><option value="product">سؤال عن منتج</option><option value="order">سؤال عن طلب مستقبلي</option><option value="guide">دليل اختيار المنتج</option><option value="partnership">تعاون</option><option value="other">موضوع آخر</option></Select></FormField>
    <FormField id="message" label="كيف يمكننا مساعدتك؟" hint="لا ترسلي معلومات صحية حساسة هنا؛ النموذج غير متصل بخدمة إرسال بعد." error={errors.message?.message}><Textarea id="message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} {...register("message")} /></FormField>
    <Button disabled={isSubmitting} type="submit">التحقق من بيانات الرسالة</Button>{submitted ? <SuccessMessage>تم التحقق من الرسالتك إلى زيت كيكاًا فقط. لم تُرسل الرسالة.</SuccessMessage> : null}
  </form>;
}
