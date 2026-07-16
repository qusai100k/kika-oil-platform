"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type Mode = "login" | "register" | "forgot" | "reset";
const safeNext = (value: string | null) => value?.startsWith("/") && !value.startsWith("//") ? value : "/account";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter(); const params = useSearchParams();
  const [busy,setBusy]=useState(false); const [message,setMessage]=useState(""); const [show,setShow]=useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); const data=new FormData(event.currentTarget);
    const email=String(data.get("email")||"").trim().toLowerCase(); const password=String(data.get("password")||"");
    try {
      if(mode==="register") {
        if(password!==String(data.get("confirmPassword")||"")) throw new Error("كلمتا المرور غير متطابقتين.");
        if(!data.get("terms")) throw new Error("يجب الموافقة على الشروط وسياسة الخصوصية.");
        const result=await authClient.signUp.email({name:String(data.get("name")||"").trim(),email,password});
        if(result.error) throw new Error(result.error.code==="USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"?"يوجد حساب بهذا البريد بالفعل.":"تعذر إنشاء الحساب. راجعي البيانات وحاولي مجددًا.");
        router.push("/account"); router.refresh(); return;
      }
      if(mode==="login") {
        const result=await authClient.signIn.email({email,password,rememberMe:Boolean(data.get("remember"))});
        if(result.error) throw new Error("بيانات الدخول غير صحيحة.");
        router.push(safeNext(params.get("next"))); router.refresh(); return;
      }
      if(mode==="forgot") {
        await authClient.requestPasswordReset({email,redirectTo:"/reset-password"});
        setMessage("إذا كان البريد مسجلًا فستصلك تعليمات الاستعادة. الإرسال الخارجي ما زال بانتظار اعتماد مزود البريد."); return;
      }
      const token=params.get("token")||""; if(!token) throw new Error("رابط الاستعادة غير صالح أو منتهي.");
      if(password!==String(data.get("confirmPassword")||"")) throw new Error("كلمتا المرور غير متطابقتين.");
      const result=await authClient.resetPassword({newPassword:password,token});
      if(result.error) throw new Error("تعذر تحديث كلمة المرور. اطلبي رابطًا جديدًا.");
      setMessage("تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن.");
    } catch(error) { setMessage(error instanceof Error?error.message:"حدث خطأ غير متوقع."); } finally { setBusy(false); }
  }
  const needsName=mode==="register", needsPassword=mode!=="forgot";
  return <form className="auth-form" onSubmit={submit} noValidate>
    {needsName&&<label>الاسم الكامل<input name="name" autoComplete="name" required minLength={2}/></label>}
    {mode!=="reset"&&<label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" required inputMode="email"/></label>}
    {needsPassword&&<label>كلمة المرور<span className="password-field"><input name="password" type={show?"text":"password"} autoComplete={mode==="login"?"current-password":"new-password"} required minLength={8}/><button type="button" onClick={()=>setShow(!show)}>{show?"إخفاء":"إظهار"}</button></span>{mode!=="login"&&<small>8 أحرف على الأقل، ويُفضّل مزج الحروف والأرقام.</small>}</label>}
    {(mode==="register"||mode==="reset")&&<label>تأكيد كلمة المرور<input name="confirmPassword" type={show?"text":"password"} autoComplete="new-password" required minLength={8}/></label>}
    {mode==="register"&&<label className="check-row"><input name="terms" type="checkbox" required/> أوافق على <Link href="/terms">الشروط</Link> و<Link href="/privacy">سياسة الخصوصية</Link>.</label>}
    {mode==="login"&&<label className="check-row"><input name="remember" type="checkbox" defaultChecked/> تذكّرني على هذا الجهاز</label>}
    {message&&<p className="auth-message" role="status">{message}</p>}
    <button className="button button--primary" disabled={busy}>{busy?"يرجى الانتظار…":mode==="login"?"تسجيل الدخول":mode==="register"?"إنشاء الحساب":mode==="forgot"?"إرسال تعليمات الاستعادة":"حفظ كلمة المرور"}</button>
    {mode==="login"&&<><Link href="/forgot-password">نسيت كلمة المرور؟</Link><p>ليس لديك حساب؟ <Link href="/register">أنشئي حسابًا</Link></p></>}
    {mode==="register"&&<p>لديك حساب؟ <Link href="/login">سجّلي الدخول</Link></p>}
  </form>;
}
