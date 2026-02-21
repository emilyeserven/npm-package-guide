import { create } from 'zustand'

const STORAGE_KEY = 'sidebar-pinned'
const DESKTOP_QUERY = '(min-width: 1024px)'

function getInitialPinned(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch { /* ignored */ }
  return false
}

interface UIState {
  sidebarOpen: boolean
  pinned: boolean
  isDesktop: boolean
  cmdMenuOpen: boolean
  scrolled: boolean
  hasActiveGuide: boolean

  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  togglePin: () => void
  unpin: () => void
  setCmdMenuOpen: (open: boolean) => void
  toggleCmdMenu: () => void
  setScrolled: (val: boolean) => void
  setHasActiveGuide: (val: boolean) => void
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  pinned: getInitialPinned(),
  isDesktop: window.matchMedia?.(DESKTOP_QUERY).matches ?? false,
  cmdMenuOpen: false,
  scrolled: false,
  hasActiveGuide: false,

  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => {
    const { pinned, isDesktop } = get()
    if (pinned && isDesktop) set({ pinned: false })
    set({ sidebarOpen: false })
  },
  toggleSidebar: () => {
    const { pinned, isDesktop } = get()
    if (pinned && isDesktop) {
      set({ pinned: false, sidebarOpen: false })
    } else {
      set({ sidebarOpen: true })
    }
  },
  togglePin: () => set((s) => ({ pinned: !s.pinned })),
  unpin: () => set({ pinned: false }),
  setCmdMenuOpen: (open) => set({ cmdMenuOpen: open }),
  toggleCmdMenu: () => set((s) => ({ cmdMenuOpen: !s.cmdMenuOpen })),
  setScrolled: (val) => set({ scrolled: val }),
  setHasActiveGuide: (val) => set({ hasActiveGuide: val }),
}))

// Persist pinned state to localStorage
useUIStore.subscribe((state) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(state.pinned))
  } catch { /* ignored */ }
})

// Sync sidebar-open body class
useUIStore.subscribe((state) => {
  const effectivelyPinned = state.pinned && state.isDesktop
  document.body.classList.toggle('sidebar-open', state.sidebarOpen && !effectivelyPinned)
})

// Track desktop media query changes
const mql = window.matchMedia(DESKTOP_QUERY)
mql.addEventListener('change', (e) => useUIStore.setState({ isDesktop: e.matches }))
