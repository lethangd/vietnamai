export function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}

export function applyDiscount(price: number, discountPercent: number) {
  const pct = Math.min(100, Math.max(0, discountPercent));
  return Math.round(price * (1 - pct / 100));
}

