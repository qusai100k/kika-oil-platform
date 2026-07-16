import { Suspense } from "react";
import { AuthForm } from "./auth-form";
export function AuthPage({mode,title,copy}:{mode:"login"|"register"|"forgot"|"reset";title:string;copy:string}) { return <section className="auth-shell"><div className="auth-card"><p className="eyebrow">حساب زيت كيكا</p><h1>{title}</h1><p>{copy}</p><Suspense fallback={<p>جارٍ التحميل…</p>}><AuthForm mode={mode}/></Suspense></div></section>; }
