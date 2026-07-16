import {requireAdmin} from "@/server/auth/authorization";import {AdminShell} from "@/components/admin/admin-shell";
export const metadata={title:"لوحة إدارة زيت كيكا",robots:{index:false,follow:false}};
export default async function Layout({children}:{children:React.ReactNode}){const {role}=await requireAdmin();return <AdminShell role={role}>{children}</AdminShell>}
