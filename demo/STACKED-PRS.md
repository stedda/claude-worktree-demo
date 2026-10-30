# Optional bonus: plan mode → stacked PRs

Do this after the three-worktree shot. Start in the original checkout on `main`
with a clean working tree. A GitHub origin must already exist.

## Plan-mode shot

```sh
claude --permission-mode plan
```

Paste:

> Plan a small invoice feature as three stacked PRs. Phase 1: add an optional discountCents argument to createInvoice, apply it before tax, clamp the discounted subtotal at zero, and test it. Phase 2: add formatInvoice(invoice), consuming Phase 1's discount data, and test its text output. Phase 3: add a tiny CLI using formatInvoice and a hard-coded fictional cart, plus an npm script and a smoke test. Show each phase, its branch, acceptance checks, and PR base: invoice-phase-1 → main, invoice-phase-2 → invoice-phase-1, invoice-phase-3 → invoice-phase-2. Planning only; do not edit yet.

Record the plan with the phase names and base branches visible. Exit plan mode
before implementation. Keep the plan if Claude asks, and resume it if useful.

## Build the actual stack

Create each branch **after** its predecessor is committed. Run these commands
in the same checkout, in this order. Keep every PR open and unmerged.

```sh
git switch main
git switch -c invoice-phase-1
claude
```

Prompt:

> Implement only invoice phase 1: optional discountCents as createInvoice's third argument, default zero; subtract it before tax and clamp at zero. Return discountCents only when a nonzero discount is supplied so existing callers keep their result shape. Test the discount, clamping, tax, and unchanged default behavior. Run npm test and commit. No other phases yet.

Exit Claude, then:

```sh
git push -u origin invoice-phase-1
gh pr create --base main --title "Phase 1: Invoice discounts" --body "Adds optional invoice discounts and focused tests. Base: main."
git switch -c invoice-phase-2
claude
```

Prompt:

> Implement only invoice phase 2 on this branch: add formatInvoice(invoice) in src/invoice-format.js. Consume the invoice including discountCents from phase 1 and format a concise USD summary using integer cents. Test discounted and undiscounted invoices. Run npm test and commit. Do not implement the CLI yet.

Exit Claude, then:

```sh
git push -u origin invoice-phase-2
gh pr create --base invoice-phase-1 --title "Phase 2: Invoice summary" --body "Formats invoice totals including phase 1 discounts. Stacked on invoice-phase-1."
git switch -c invoice-phase-3
claude
```

Prompt:

> Implement only invoice phase 3: a tiny src/cli.js that creates a discounted invoice for a hard-coded fictional cart and prints formatInvoice from phase 2. Add npm run invoice and a smoke test checking the actual CLI output. Run npm test and npm run invoice, then commit.

Exit Claude, then:

```sh
git push -u origin invoice-phase-3
gh pr create --base invoice-phase-2 --title "Phase 3: Invoice CLI" --body "Adds a CLI consuming the phase 2 formatter. Stacked on invoice-phase-2."
npm run demo:prs
```

The table shows actual head → base relationships and per-PR diff sizes. For
the browser shot, filter the GitHub PR list with `is:pr is:open Phase in:title`.
The usual list alone does not prove stacking: open each PR briefly to show its
base selector, or pair the list with the CLI table. Phase 2 must target
`invoice-phase-1`; phase 3 must target `invoice-phase-2`.
