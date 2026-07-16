export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(amount: number, currency: string) {
  return `${new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 }).format(amount)} ${currency}`;
}
