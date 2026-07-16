import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
export function FormField({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return <div className="field"><Label htmlFor={id}>{label}</Label>{children}{hint && !error ? <p className="field-hint" id={`${id}-hint`}>{hint}</p> : null}{error ? <p className="field-error" id={`${id}-error`} role="alert">{error}</p> : null}</div>;
}
