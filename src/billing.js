function subtotalOf(items) {
  return items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
}

export function calculateTotal(items, taxRate = 0) {
  const subtotal = subtotalOf(items);
  return subtotal + Math.round(subtotal * taxRate);
}

export function createInvoice(items, taxRate = 0) {
  const subtotal = subtotalOf(items);
  const tax = Math.round(subtotal * taxRate);
  return { subtotal, tax, total: subtotal + tax };
}
