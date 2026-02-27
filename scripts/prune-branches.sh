#!/usr/bin/env bash
# Prune old claude/* remote branches that are no longer needed.
# Usage: bash scripts/prune-branches.sh [--dry-run]
#
# This script deletes all remote claude/* branches except any that have
# an open pull request. Requires the GitHub CLI (gh) to be installed.

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "=== DRY RUN — no branches will be deleted ==="
  echo
fi

# Collect remote claude/* branches
branches=$(git branch -r | grep 'origin/claude/' | sed 's/^ *origin\///')

if [[ -z "$branches" ]]; then
  echo "No remote claude/* branches found."
  exit 0
fi

total=$(echo "$branches" | wc -l)
echo "Found $total remote claude/* branch(es)."
echo

deleted=0
skipped=0

for branch in $branches; do
  # Check if this branch has an open PR
  open_pr=$(gh pr list --head "$branch" --state open --json number --jq 'length' 2>/dev/null || echo "0")

  if [[ "$open_pr" -gt 0 ]]; then
    echo "SKIP  $branch  (has open PR)"
    skipped=$((skipped + 1))
  else
    if $DRY_RUN; then
      echo "WOULD DELETE  $branch"
    else
      echo -n "DELETE  $branch ... "
      if git push origin --delete "$branch" 2>/dev/null; then
        echo "done"
      else
        echo "FAILED"
      fi
    fi
    deleted=$((deleted + 1))
  fi
done

echo
echo "Summary: $deleted deleted, $skipped skipped (open PR), $total total"
