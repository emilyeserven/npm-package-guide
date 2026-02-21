import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
  } catch { /* ignored */ }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}))

// Sync DOM on every theme change (including initial)
function applyTheme(theme: Theme) {
  document.body.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem('theme', theme)
  } catch { /* ignored */ }
}

applyTheme(useThemeStore.getState().theme)
useThemeStore.subscribe((state) => applyTheme(state.theme))

export function useTheme() {
  return useThemeStore(useShallow((s) => ({ theme: s.theme, toggleTheme: s.toggleTheme })))
}

export function useIsDark(): boolean {
  return useThemeStore((s) => s.theme === 'dark')
}
