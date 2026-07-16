import type { ReactNode } from "react";
export function Alert({ title, children, tone = "info" }: { title: string; children: ReactNode; tone?: "info" | "success" | "error" }) { return <div className={`alert alert--${tone}`} role={tone === "error" ? "alert" : "status"}><strong>{title}</strong><div>{children}</div></div>; }
