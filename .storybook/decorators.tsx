import { useEffect, type ReactNode } from 'react'
import { ThemeProvider, useTheme } from '../src/hooks/useTheme'
import { PMProvider } from '../src/hooks/usePMContext'

/**
 * Syncs the ThemeProvider's internal state with the body class
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
    <ThemeProvider>
      <ThemeSync>
        <PMProvider>
          {children}
        </PMProvider>
      </ThemeSync>
    </ThemeProvider>
  )
}
