export function formatMoney(cents: number): string {
  const dollars = cents / 100;
  return dollars.toLocaleString(undefined, { style: "currency", currency: "USD" });
}
