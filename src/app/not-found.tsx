import Link from "next/link";
import { PageContainer } from "@/components/shared/page-container";
export default function NotFound() { return <PageContainer><section className="page-hero"><p className="eyebrow">404</p><h1>هذه الصفحة غير موجودة</h1><p>ربما تغير الرابط أو لم تُبنَ هذه الصفحة بعد.</p><Link className="link-button" href="/">العودة إلى الرئيسية</Link></section></PageContainer>; }
