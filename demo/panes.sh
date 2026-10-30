#!/usr/bin/env bash
set -euo pipefail

command -v tmux >/dev/null || { echo 'Install tmux before opening the demo panes.' >&2; exit 1; }
# Keep the demo's configuration and panes separate from existing tmux servers.
tmux() { command tmux -L claude-worktree-demo "$@"; }
repo=$(cd "$(dirname "$0")/.." && pwd)
session=claude-worktree-demo

if ! tmux has-session -t "=$session" 2>/dev/null; then
  # An isolated config and clean shell keep personal prompt content off screen.
  tmux -f /dev/null new-session -d -s "$session" -n demo -c "$repo" 'zsh -f'
  tmux set-option -t "$session" status off
  tmux set-window-option -t "$session:demo" pane-border-status top
  tmux set-window-option -t "$session:demo" pane-border-format ' #{pane_title} '
  tmux set-option -t "$session" mouse on
  tmux split-window -h -t "$session:demo" -c "$repo" 'zsh -f'
  tmux split-window -h -t "$session:demo" -c "$repo" 'zsh -f'
  tmux select-layout -t "$session:demo" even-horizontal >/dev/null
  index=0
  for title in fix-auth refactor-billing flaky-tests; do
    pane=$(tmux list-panes -t "$session:demo" -F '#{pane_id}' | sed -n "$((index + 1))p")
    tmux select-pane -t "$pane" -T "$title"
    tmux send-keys -t "$pane" "PROMPT='demo % '; RPROMPT=''; clear; git branch" Enter
    index=$((index + 1))
  done
  first=$(tmux list-panes -t "$session:demo" -F '#{pane_id}' | sed -n '1p')
  tmux select-pane -t "$first"
fi

if [[ "${1:-}" == --prepare ]]; then
  echo "Prepared tmux session: $session"
  tmux list-panes -t "$session:demo" -F '#{pane_title}: #{pane_current_path}'
else
  TMUX= tmux attach-session -t "$session"
fi
