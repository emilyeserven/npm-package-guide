import type { SectionLink } from '../../helpers/renderFootnotes'

export type { RegistryLink } from './types'
import type { RegistryLink } from './types'

// ── Auto-discover all guide-specific link files ──────────────────────
//
// Convention: every *Links.ts file in this directory exports a
// RegistryLink[] as its sole named export. New guides just need to
// add a <guideId>Links.ts file — no manual import list needed.

const linkModules = import.meta.glob<{ [key: string]: RegistryLink[] }>(
  ['./*Links.ts'],
  { eager: true },
)

export const linkRegistry: RegistryLink[] = Object.values(linkModules).flatMap(
  mod => {
    // Each module exports exactly one named constant (e.g., npmPackageLinks)
    const arrays = Object.values(mod).filter(Array.isArray)
    return arrays.flatMap(a => a as RegistryLink[])
  },
)

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
