export function calculateTotal(items, taxRate = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  return subtotal + Math.round(subtotal * taxRate);
}

export function createInvoice(items, taxRate = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * taxRate);
  return { subtotal, tax, total: subtotal + tax };
}
