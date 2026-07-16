import Link from "next/link";
const links=[["/account","نظرة عامة"],["/account/profile","الملف الشخصي"],["/account/addresses","العناوين"],["/account/security","الأمان"],["/account/orders","الطلبات"],["/account/assessments","تقييمات البشرة"],["/account/recommendations","التوصيات"],["/account/consultations","الاستشارات"],["/account/preferences","التفضيلات"]];
export function AccountNav(){return <nav className="account-nav" aria-label="أقسام الحساب">{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav>}
