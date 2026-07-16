import { PageContainer } from "@/components/shared/page-container";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() { return <PageContainer><section className="section"><span className="sr-only">جارٍ تحميل الصفحة</span><div className="grid-3"><Skeleton /><Skeleton /><Skeleton /></div></section></PageContainer>; }
