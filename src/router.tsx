import { createRouter, createRoute, createRootRoute, createHashHistory } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { GuidesIndexPage } from './components/GuidesIndexPage'
import { MDXPageWrapper } from './components/MDXPageWrapper'
import { contentPages } from './content/registry'
import { simpleComponentPages, searchParamPages } from './data/componentPages'

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
  search?: string
}

// eslint-disable-next-line react-refresh/only-export-components
function SectionRouter() {
  const { sectionId } = sectionRoute.useParams()
  const searchParams = sectionRoute.useSearch()

  // 1. Component pages that receive route search params
  const searchParamRenderer = searchParamPages[sectionId]
  if (searchParamRenderer) return <>{searchParamRenderer(searchParams)}</>

  // 2. Simple component pages (no props)
  const SimpleComponent = simpleComponentPages[sectionId]
  if (SimpleComponent) return <SimpleComponent />

  // 3. MDX content pages (auto-discovered)
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
    search: typeof search.search === 'string' ? search.search : undefined,
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
