export function Skeleton({ label = "جارٍ التحميل" }: { label?: string }) { return <div className="skeleton" role="status"><span className="sr-only">{label}</span></div>; }
