import test from 'node:test';
import assert from 'node:assert/strict';
import { isSessionValid } from '../src/auth.js';

const now = 1_800_000_000_000;

test('accepts a session that expires in the future', () => {
  assert.equal(isSessionValid({ userId: 'demo-user', expiresAt: now + 1 }, now), true);
});

test('rejects a session expiring exactly now', () => {
  assert.equal(isSessionValid({ userId: 'demo-user', expiresAt: now }, now), false);
});

test('rejects an expired session', () => {
  assert.equal(isSessionValid({ userId: 'demo-user', expiresAt: now - 1 }, now), false);
});

test('rejects missing or malformed sessions', () => {
  for (const session of [null, {}, { userId: 'demo-user' }, { expiresAt: now + 1 }]) {
    assert.equal(isSessionValid(session, now), false);
  }
});
