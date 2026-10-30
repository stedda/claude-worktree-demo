import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cliPath = fileURLToPath(new URL('../src/cli.js', import.meta.url));

test('CLI prints a formatted invoice', () => {
  const output = execFileSync('node', [cliPath], { encoding: 'utf8' });
  assert.match(output, /Subtotal: \$/);
  assert.match(output, /Discount: -\$/);
  assert.match(output, /Total:    \$/);
});
