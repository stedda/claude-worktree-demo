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

function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatInvoice(invoice) {
  const { subtotal, discount, tax, total } = invoice;
  const lines = [`Subtotal: ${formatCents(subtotal)}`];
  if (discount > 0) {
    lines.push(`Discount: -${formatCents(discount)}`);
  }
  lines.push(`Tax:      ${formatCents(tax)}`);
  lines.push(`Total:    ${formatCents(total)}`);
  return lines.join('\n');
}
