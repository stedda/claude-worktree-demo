# Tiny Shop — Claude worktree demo

A fictional Node.js repo for a 45–60 second screen recording. No dependencies,
accounts, customer data, or company references. Node.js 20+ is enough.

```sh
npm test
npm run demo:panes
```

The panes start in the same repo with a plain `demo %` prompt and `git branch`
showing only `main`. Nothing launches Claude until you enter a command.

## Three small tasks

Each task touches its own module and tests, so the PRs can stay independent.
The seed intentionally contains an auth boundary bug, billing duplication, and
a retry test that depends on real elapsed time. The existing suite normally
passes; the retry timing assertion can fail under load.

**Pane 1**

```sh
claude --worktree fix-auth
```

Paste:

> Fix auth: a session expiring exactly now must be invalid. Add a boundary test, run npm test, and commit only the auth change. Keep this worktree.

**Pane 2**

```sh
claude --worktree refactor-billing
```

Paste:

> Refactor billing: extract the duplicated subtotal calculation into one private helper. Preserve the public API and behavior, run npm test, and commit only the billing change. Keep this worktree.

**Pane 3**

```sh
claude --worktree flaky-tests
```

Paste:

> Fix the flaky retry test: inject a wait function defaulting to the real sleep, then test requested delays without wall-clock assertions or real sleeps. Preserve retry behavior, run npm test, and commit only retry code and tests. Keep this worktree.

Before recording, complete Claude's login and trust prompts in this demo repo.
Close that warm-up session before starting the shot. Review any permission
prompts normally; the pane launcher does not bypass them.

## Recording beats

| Final time | Shot |
| --- | --- |
| 0–5 s | Three panes, `git branch` showing only `main`. |
| 5–18 s | Launch the three commands and submit the three short prompts. |
| 18–38 s | All three working; accelerate this section 4× in your editor. |
| 38–46 s | Exit Claude, keep each worktree, and show worktrees and branches. |
| 46–60 s | Show the three open PRs and their actual diff sizes. |

Adjust the accelerated segment to the actual runtime. Cut onboarding and dead
time; the commands are real, and no agent output or duration is simulated.
Use a large terminal window; 210 columns gives each pane about 70 columns.
Enable Do Not Disturb and frame only the demo terminal and GitHub repo.

After the agents finish, use `/exit` and choose to keep the worktree if prompted.
From the original checkout:

```sh
git worktree list
git branch
```

Expect **four worktree entries**: the original `main` checkout plus three new
worktree directories. Expect `main` plus three new branches. Claude chooses the
branch names; use the names actually printed rather than assuming a prefix.

## GitHub ending

Run these manually if you want to publish this fictional demo. Creating a new
remote is separate from the local setup:

```sh
gh repo create claude-worktree-demo --public --source . --remote origin --push
```

Then, in each Claude worktree, ask:

> Push this branch and open one small PR against main. Use a clear title and include the test result. Leave it open; do not merge.

Or run inside each worktree yourself:

```sh
git push -u origin HEAD
gh pr create --base main --fill
```

From the original checkout:

```sh
gh browse -- /pulls
npm run demo:prs
```

The regular GitHub PR list does not display line additions/deletions. Use the
CLI table as a brief insert or an overlay alongside the browser shot; it fetches
real PR titles, diff sizes, and base branches. Do not invent the counts.

## Optional stacked-PR bonus

After the primary recording, see [demo/STACKED-PRS.md](demo/STACKED-PRS.md).
That exercise adds its branches only when you run it. Keep its shot separate
from the three independent PRs so the main-only opening remains reproducible.
