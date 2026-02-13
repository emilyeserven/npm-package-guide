/**
 * Registry of component-rendered pages (non-MDX).
 *
 * Maps page IDs to their React component. The router uses this map to
 * resolve pages — adding a new entry here is all that's needed to make
 * a new component page routable.
 *
 * Pages that require route search params (guide, search) are registered
 * separately in `searchParamPages` with a render function.
 */

import type { ComponentType, ReactNode } from 'react'
import { RoadmapPage } from '../components/RoadmapPage'
import { ChecklistPage } from '../components/ChecklistPage'
import { ArchStartPage } from '../components/ArchStartPage'
import { TestingStartPage } from '../components/TestingStartPage'
import { PromptStartPage } from '../components/PromptStartPage'
import { ExternalResourcesPage } from '../components/ExternalResourcesPage'
import { GlossaryPage } from '../components/GlossaryPage'

// ── Simple component pages (no props from the route) ─────────────────

export const simpleComponentPages: Record<string, ComponentType> = {
  'roadmap': RoadmapPage,
  'checklist': ChecklistPage,
  'architecture': ArchStartPage,   // Legacy route
  'arch-start': ArchStartPage,
  'test-start': TestingStartPage,
  'prompt-start': PromptStartPage,
}

// ── Pages that receive route search params ───────────────────────────

export interface SearchParams {
  guide?: string
  search?: string
}

export const searchParamPages: Record<string, (params: SearchParams) => ReactNode> = {
  'external-resources': ({ guide }) => <ExternalResourcesPage initialGuide={guide} />,
  'glossary': ({ guide, search }) => <GlossaryPage initialGuide={guide} initialSearch={search} />,
}

// ── Combined lookup (for validation — checks if a page ID is registered) ──

export const allComponentPageIds = new Set([
  ...Object.keys(simpleComponentPages),
  ...Object.keys(searchParamPages),
])
