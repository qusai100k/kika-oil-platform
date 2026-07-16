import type { ReactNode } from "react";
export function Dropdown({ label, children }: { label: string; children: ReactNode }) { return <details className="dropdown"><summary>{label}</summary><div className="dropdown__menu">{children}</div></details>; }
