export function calculateTotal(items, taxRate = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  return subtotal + Math.round(subtotal * taxRate);
}

export function createInvoice(items, taxRate = 0, discountCents = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  const discount = Math.min(Math.max(discountCents, 0), subtotal);
  const discounted = subtotal - discount;
  const tax = Math.round(discounted * taxRate);
  return { subtotal, discount, tax, total: discounted + tax };
}
