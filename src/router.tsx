import { createRouter, createRoute, createRootRoute, createHashHistory } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { RoadmapPage } from './components/RoadmapPage'
import { SectionPage } from './components/SectionPage'
import { ChecklistPage } from './components/ChecklistPage'
import { CIPage } from './components/CIPage'
import { BonusSectionPage } from './components/BonusSectionPage'
import { OverallResourcesPage } from './components/OverallResourcesPage'
import { SectionLinksPage } from './components/SectionLinksPage'
import { ciPageIds } from './data/ciPages'
import { bonusIds } from './data/bonusSections'

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
  if (sectionId === 'overall-resources') return <OverallResourcesPage />
  if (sectionId === 'section-links') return <SectionLinksPage />
  if (ciPageIds.includes(sectionId)) return <CIPage pageId={sectionId} />
  if (bonusIds.includes(sectionId)) return <BonusSectionPage sectionId={sectionId} />

  return <SectionPage sectionId={sectionId} />
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
