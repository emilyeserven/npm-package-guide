#!/usr/bin/env bash
set -euo pipefail

# Only run in Claude Code remote/web environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# ── Environment check ────────────────────────────────────────────────
echo "--- Environment ---"
echo "  Node:  $(node --version 2>/dev/null || echo 'NOT FOUND')"
echo "  pnpm:  $(pnpm --version 2>/dev/null || echo 'NOT FOUND')"

if ! command -v pnpm &>/dev/null; then
  echo "ERROR: pnpm is not installed."
  exit 1
fi

# Install project dependencies (plain install benefits from container caching)
pnpm install

# Install Playwright Chromium browser + system deps (matches playwright.config.ts)
# Non-fatal: don't break the hook if the CDN is temporarily unreachable
npx playwright install --with-deps chromium || echo "Warning: Playwright browser install failed (e2e tests may not work)"

echo ""
echo "--- Ready ---"
echo "  Dependencies installed. Run 'pnpm validate' to verify the project builds."
