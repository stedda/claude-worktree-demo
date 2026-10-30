import { pathToFileURL } from 'node:url';
import { createInvoice, formatInvoice } from './billing.js';

const cart = [
  { name: 'Notebook', priceCents: 1_200, quantity: 2 },
  { name: 'Pen', priceCents: 300, quantity: 1 },
  { name: 'Sticker pack', priceCents: 450, quantity: 3 },
];

const TAX_RATE = 0.2;
const DISCOUNT_CENTS = 500;

export function run() {
  const invoice = createInvoice(cart, TAX_RATE, DISCOUNT_CENTS);
  return formatInvoice(invoice);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(run());
}
