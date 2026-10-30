import test from 'node:test';
import assert from 'node:assert/strict';
import { retry } from '../src/retry.js';

test('returns a successful result', async () => {
  assert.equal(await retry(async () => 'ok'), 'ok');
});

test('retries a transient failure after requesting the configured delay', async () => {
  let calls = 0;
  const delays = [];
  const result = await retry(async () => {
    calls++;
    if (calls === 1) throw new Error('temporary failure');
    return 'recovered';
  }, { delayMs: 10, wait: async (ms) => { delays.push(ms); } });

  assert.equal(result, 'recovered');
  assert.equal(calls, 2);
  // Assert the requested delay, not elapsed wall-clock time.
  assert.deepEqual(delays, [10]);
});

test('throws the final error after exhausting attempts', async () => {
  let calls = 0;
  const delays = [];
  await assert.rejects(retry(async () => {
    calls++;
    throw new Error('service unavailable');
  }, { attempts: 2, delayMs: 1, wait: async (ms) => { delays.push(ms); } }), /service unavailable/);
  assert.equal(calls, 2);
  assert.deepEqual(delays, [1]);
});
