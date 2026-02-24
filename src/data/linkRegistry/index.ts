import type { SectionLink } from '../../helpers/renderFootnotes'

/**
 * Centralized link registry — single source of truth for all external URLs.
 *
 * Every footnote, further-reading link, glossary term URL, and External Resources
 * entry references this registry by ID instead of duplicating metadata.
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
 *
 * Link entries are split by guide into separate files:
 *   - npmPackageLinks.ts     — NPM Package Guide links
 *   - architectureLinks.ts   — Architecture Guide links
 *   - testingLinks.ts        — Testing Guide links
 *   - promptLinks.ts         — Prompt Engineering Guide links
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

import { npmPackageLinks } from './npmPackageLinks'
import { architectureLinks } from './architectureLinks'
import { testingLinks } from './testingLinks'
import { promptLinks } from './promptLinks'
import { cicdLinks } from './cicdLinks'
import { authLinks } from './authLinks'
import { kubernetesLinks } from './kubernetesLinks'
import { aiInfraLinks } from './aiInfraLinks'
import { njaLinks } from './njaLinks'
import { wpAgentsLinks } from './wpAgentsLinks'
import { gitWorktreesLinks } from './gitWorktreesLinks'
import { securityLinks } from './securityLinks'
import { stateManagementLinks } from './stateManagementLinks'
import { tanstackQueryLinks } from './tanstackQueryLinks'
import { tanstackRouterLinks } from './tanstackRouterLinks'
import { s3Links } from './s3Links'
import { awsDecodedLinks } from './awsDecodedLinks'
import { claudeSkillsLinks } from './claudeSkillsLinks'
import { zustandLinks } from './zustandLinks'
import { coworkLinks } from './coworkLinks'

export const linkRegistry: RegistryLink[] = [
  ...npmPackageLinks,
  ...architectureLinks,
  ...testingLinks,
  ...promptLinks,
  ...cicdLinks,
  ...authLinks,
  ...kubernetesLinks,
  ...aiInfraLinks,
  ...njaLinks,
  ...wpAgentsLinks,
  ...gitWorktreesLinks,
  ...securityLinks,
  ...stateManagementLinks,
  ...tanstackQueryLinks,
  ...tanstackRouterLinks,
  ...s3Links,
  ...awsDecodedLinks,
  ...claudeSkillsLinks,
  ...zustandLinks,
  ...coworkLinks,
]

/** Fast lookup by registry ID */
export const linkById = new Map<string, RegistryLink>(
  linkRegistry.map(link => [link.id, link])
)


/**
 * Resolve a registry ID to a SectionLink (the shape consumed by FootnoteContext).
 * Throws if the ID is unknown — catches broken references during dev server startup.
 */
export function resolveLink(id: string, noteOverride?: string): SectionLink {
  const entry = linkById.get(id)
  if (!entry) {
    throw new Error(`[linkRegistry] Unknown link ID: "${id}". Add it to the appropriate file in src/data/linkRegistry/.`)
  }
  return {
    label: entry.label,
    url: entry.url,
    source: entry.source,
    note: noteOverride ?? undefined,
  }
}
