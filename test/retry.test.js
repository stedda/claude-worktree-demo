import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { retry } from '../src/retry.js';

test('returns a successful result', async () => {
  assert.equal(await retry(async () => 'ok'), 'ok');
});

test('retries a transient failure after a short delay', async () => {
  let calls = 0;
  const started = performance.now();
  const result = await retry(async () => {
    calls++;
    if (calls === 1) throw new Error('temporary failure');
    return 'recovered';
  }, { delayMs: 10 });

  assert.equal(result, 'recovered');
  assert.equal(calls, 2);
  // Intentionally fragile: a busy machine can exceed this wall-clock budget.
  assert.ok(performance.now() - started < 100, 'retry should finish within 100ms');
});

test('throws the final error after exhausting attempts', async () => {
  let calls = 0;
  await assert.rejects(retry(async () => {
    calls++;
    throw new Error('service unavailable');
  }, { attempts: 2, delayMs: 1 }), /service unavailable/);
  assert.equal(calls, 2);
});
