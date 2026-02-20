/* eslint-disable react-refresh/only-export-components */
import { useEffect, type ReactNode } from 'react'
import { useTheme } from '../src/hooks/useTheme'
import {
  createRouter,
  createRoute,
  createRootRoute,
  createMemoryHistory,
  RouterProvider,
} from '@tanstack/react-router'

/**
 * Syncs the Zustand theme store with the body class
 * set by @storybook/addon-themes withThemeByClassName decorator.
 */
function ThemeSync({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bodyHasDark = document.body.classList.contains('dark')
      const contextIsDark = theme === 'dark'
      if (bodyHasDark !== contextIsDark) {
        toggleTheme()
      }
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [theme, toggleTheme])

  return <>{children}</>
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeSync>
      {children}
    </ThemeSync>
  )
}

/**
 * Storybook decorator that wraps a story in a minimal TanStack Router context.
 * Needed for components that use useNavigate() or useNavigateToSection().
 */
export function withRouter(Story: () => ReactNode) {
  const rootRoute = createRootRoute({
    component: () => <>{Story()}</>,
  })
  const sectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/$sectionId',
    component: () => null,
  })
  const routeTree = rootRoute.addChildren([sectionRoute])
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })

  return <RouterProvider router={router} />
}
