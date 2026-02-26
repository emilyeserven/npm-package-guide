/**
 * Centralized link registry type — single source of truth for all external URLs.
 *
 * ID convention: {source}-{topic-slug}
 *   e.g. "npm-about", "mdn-tree-shaking", "ts-tsconfig-reference"
 *
 * Fields:
 *   id    — human-readable slug (stable even if URLs change)
 *   url   — the external URL
 *   label — display name for footnotes and the resources table
 *   source — attribution (e.g. "npm", "MDN", "TypeScript")
 *   desc  — description for the External Resources table (optional)
 *   tags  — type/topic/guide tags for External Resources filtering (optional)
 *   resourceCategory — if set, appears on External Resources under this heading
 */
export interface RegistryLink {
  id: string
  url: string
  label: string
  source: string
  desc?: string
  tags?: string[]
  resourceCategory?: string
}
