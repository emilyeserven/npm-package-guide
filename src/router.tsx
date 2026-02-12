import { createRouter, createRoute, createRootRoute, createHashHistory } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { GuidesIndexPage } from './components/GuidesIndexPage'
import { RoadmapPage } from './components/RoadmapPage'
import { ChecklistPage } from './components/ChecklistPage'
import { ExternalResourcesPage } from './components/ExternalResourcesPage'
import { GlossaryPage } from './components/GlossaryPage'
import { ArchStartPage } from './components/ArchStartPage'
import { MDXPageWrapper } from './components/MDXPageWrapper'
import { contentPages } from './content/registry'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GuidesIndexPage,
})

interface SectionSearch {
  guide?: string
}

// eslint-disable-next-line react-refresh/only-export-components
function SectionRouter() {
  const { sectionId } = sectionRoute.useParams()
  const { guide } = sectionRoute.useSearch()

  if (sectionId === 'roadmap') return <RoadmapPage />
  if (sectionId === 'checklist') return <ChecklistPage />
  if (sectionId === 'external-resources') return <ExternalResourcesPage initialGuide={guide} />
  if (sectionId === 'glossary') return <GlossaryPage initialGuide={guide} />
  if (sectionId === 'architecture' || sectionId === 'arch-start') return <ArchStartPage />

  const page = contentPages.get(sectionId)
  if (page) return <MDXPageWrapper page={page} />

  return <div>Section not found</div>
}

const sectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$sectionId',
  component: SectionRouter,
  validateSearch: (search: Record<string, unknown>): SectionSearch => ({
    guide: typeof search.guide === 'string' ? search.guide : undefined,
  }),
})

const routeTree = rootRoute.addChildren([indexRoute, sectionRoute])

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
