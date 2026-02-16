#!/usr/bin/env bash
set -euo pipefail

# Only run in Claude Code remote/web environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install project dependencies (plain install benefits from container caching)
pnpm install

# Install Playwright Chromium browser + system deps (matches playwright.config.ts)
# Non-fatal: don't break the hook if the CDN is temporarily unreachable
npx playwright install --with-deps chromium || echo "Warning: Playwright browser install failed (e2e tests may not work)"
