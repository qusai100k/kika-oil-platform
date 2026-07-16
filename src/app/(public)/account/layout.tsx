import { requireSession } from "@/server/auth/session";import { AccountNav } from "@/components/account/account-nav";
export default async function Layout({children}:{children:React.ReactNode}){await requireSession();return <section className="account-shell"><aside><p className="eyebrow">مساحتي</p><h1>حسابي</h1><AccountNav/></aside><div className="account-content">{children}</div></section>}
