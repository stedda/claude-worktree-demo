import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal, createInvoice } from '../src/billing.js';

const items = [
  { name: 'Notebook', priceCents: 1_200, quantity: 2 },
  { name: 'Pen', priceCents: 300, quantity: 1 },
];

test('calculates a total without tax', () => {
  assert.equal(calculateTotal(items), 2_700);
});

test('creates an invoice with tax', () => {
  assert.deepEqual(createInvoice(items, 0.2), { subtotal: 2_700, tax: 540, total: 3_240 });
  assert.equal(calculateTotal(items, 0.2), 3_240);
});

test('rounds tax to whole cents', () => {
  assert.deepEqual(createInvoice([{ priceCents: 99, quantity: 1 }], 0.075), {
    subtotal: 99, tax: 7, total: 106,
  });
});

test('handles an empty cart', () => {
  assert.equal(calculateTotal([]), 0);
  assert.deepEqual(createInvoice([]), { subtotal: 0, tax: 0, total: 0 });
});
