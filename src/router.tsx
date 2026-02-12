import { createRouter, createRoute, createRootRoute, createHashHistory } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { RoadmapPage } from './components/RoadmapPage'
import { ChecklistPage } from './components/ChecklistPage'
import { ExternalResourcesPage } from './components/ExternalResourcesPage'
import { GlossaryPage } from './components/GlossaryPage'
import { MDXPageWrapper } from './components/MDXPageWrapper'
import { contentPages } from './content/registry'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RoadmapPage,
})

// eslint-disable-next-line react-refresh/only-export-components
function SectionRouter() {
  const { sectionId } = sectionRoute.useParams()

  if (sectionId === 'roadmap') return <RoadmapPage />
  if (sectionId === 'checklist') return <ChecklistPage />
  if (sectionId === 'external-resources') return <ExternalResourcesPage />
  if (sectionId === 'glossary') return <GlossaryPage />

  const page = contentPages.get(sectionId)
  if (page) return <MDXPageWrapper page={page} />

  return <div>Section not found</div>
}

const sectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$sectionId',
  component: SectionRouter,
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
