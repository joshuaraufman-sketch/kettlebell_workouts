#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web (remote) sessions, where the container
# starts fresh and node_modules is not present.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Install dependencies so typecheck/lint/test tooling works out of the box.
npm ci
