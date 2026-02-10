import { cmd } from '../helpers/cmd'

export interface ChecklistItem {
  text: string
  cat: string
  badge: string
}

export const checklistItems: ChecklistItem[] = [
  { text: "Ships ESM format (and optionally CJS for older Node.js)", cat: "Build", badge: "badge-build" },
  { text: "Includes TypeScript declarations (.d.ts files)", cat: "Types", badge: "badge-types" },
  { text: 'package.json "exports" field properly configured', cat: "Config", badge: "badge-config" },
  { text: '"files" field limits published content to dist/ only', cat: "Config", badge: "badge-config" },
  { text: "Framework deps (React, etc.) are peerDependencies, not dependencies", cat: "Deps", badge: "badge-deps" },
  { text: "README with: install command, basic usage example, API reference", cat: "Docs", badge: "badge-docs" },
  { text: "CHANGELOG tracks what changed in each version", cat: "Docs", badge: "badge-docs" },
  { text: "Ran " + cmd("npm pack --dry-run", "pnpm pack --dry-run") + " to verify published contents", cat: "Pre-publish", badge: "badge-prepublish" },
  { text: "All tests pass against the public API", cat: "Pre-publish", badge: "badge-prepublish" },
  { text: "LICENSE file included (MIT is most common for open source)", cat: "Legal", badge: "badge-legal" },
  { text: "Version bumped following semver rules", cat: "Pre-publish", badge: "badge-prepublish" },
  { text: ".npmignore or 'files' field excludes tests, source, and config files", cat: "Config", badge: "badge-config" }
]
