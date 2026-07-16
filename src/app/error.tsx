"use client";
import { ErrorState } from "@/components/feedback/states";
import { Button } from "@/components/ui/button";
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="section container"><ErrorState /><p style={{ textAlign: "center" }}><Button onClick={() => reset()}>إعادة المحاولة</Button></p></section>; }
