#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Actual GitHub data, including explicit PR bases for the optional stack shot.
exec gh pr list --state open --limit 20 \
  --json number,title,headRefName,baseRefName,additions,deletions \
  --template '{{printf "PR    + / -        TITLE / BRANCH → BASE\n"}}{{range .}}{{printf "#%-3v  +%-4v -%-4v  %s\n                   %s → %s\n" .number .additions .deletions .title .headRefName .baseRefName}}{{end}}'
