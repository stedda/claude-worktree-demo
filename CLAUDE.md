# Tiny Shop demo

This is a fictional, dependency-free Node.js app for a screen recording.
Use Node.js 20+ and run `npm test`; no install, database, secrets, or services.

Keep each task small and limited to its module and matching tests:
- Auth: `src/auth.js` and `test/auth.test.js`.
- Billing: `src/billing.js` and `test/billing.test.js`.
- Retry: `src/retry.js` and `test/retry.test.js`.

Amounts are integer cents; tax rates are decimal fractions. Preserve existing
public behavior unless the task explicitly changes it. Do not add dependencies.
Run the tests, commit the focused change, and leave the worktree available.
Only push and open a PR when the user explicitly asks. Never merge a demo PR.
