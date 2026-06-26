export function formatRupees(amount: number): string {
  if (!Number.isFinite(amount)) return "₹0";
  return "₹" + new Intl.NumberFormat("en-IN").format(Math.round(amount));
}
