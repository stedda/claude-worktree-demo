import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal, createInvoice, formatInvoice } from '../src/billing.js';

const items = [
  { name: 'Notebook', priceCents: 1_200, quantity: 2 },
  { name: 'Pen', priceCents: 300, quantity: 1 },
];

test('calculates a total without tax', () => {
  assert.equal(calculateTotal(items), 2_700);
});

test('creates an invoice with tax', () => {
  assert.deepEqual(createInvoice(items, 0.2), { subtotal: 2_700, discount: 0, tax: 540, total: 3_240 });
  assert.equal(calculateTotal(items, 0.2), 3_240);
});

test('rounds tax to whole cents', () => {
  assert.deepEqual(createInvoice([{ priceCents: 99, quantity: 1 }], 0.075), {
    subtotal: 99, discount: 0, tax: 7, total: 106,
  });
});

test('handles an empty cart', () => {
  assert.equal(calculateTotal([]), 0);
  assert.deepEqual(createInvoice([]), { subtotal: 0, discount: 0, tax: 0, total: 0 });
});

test('applies a discount before tax', () => {
  assert.deepEqual(createInvoice(items, 0.2, 700), {
    subtotal: 2_700, discount: 700, tax: 400, total: 2_400,
  });
});

test('clamps a discount larger than the subtotal to zero total', () => {
  assert.deepEqual(createInvoice(items, 0.2, 10_000), {
    subtotal: 2_700, discount: 2_700, tax: 0, total: 0,
  });
});

test('ignores a negative discount', () => {
  assert.deepEqual(createInvoice(items, 0, -500), {
    subtotal: 2_700, discount: 0, tax: 0, total: 2_700,
  });
});

test('formats an invoice without a discount', () => {
  const invoice = createInvoice(items, 0.2);
  assert.equal(
    formatInvoice(invoice),
    ['Subtotal: $27.00', 'Tax:      $5.40', 'Total:    $32.40'].join('\n'),
  );
});

test('formats an invoice with a discount line', () => {
  const invoice = createInvoice(items, 0.2, 700);
  assert.equal(
    formatInvoice(invoice),
    ['Subtotal: $27.00', 'Discount: -$7.00', 'Tax:      $4.00', 'Total:    $24.00'].join('\n'),
  );
});
