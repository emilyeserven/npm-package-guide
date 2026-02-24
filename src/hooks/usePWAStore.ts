import { create } from 'zustand'

const CACHE_TS_KEY = 'pwa-cache-updated'

function getStoredCacheTimestamp(): number | null {
  try {
    const val = localStorage.getItem(CACHE_TS_KEY)
    return val ? Number(val) : null
  } catch { return null }
}

interface PWAState {
  isOnline: boolean
  cacheTimestamp: number | null
  swRegistration: ServiceWorkerRegistration | null
  checking: boolean

  setOnline: (val: boolean) => void
  setCacheTimestamp: (ts: number) => void
  setSwRegistration: (reg: ServiceWorkerRegistration | null) => void
  checkForUpdates: () => Promise<void>
  clearCacheAndReload: () => Promise<void>
}

export const usePWAStore = create<PWAState>((set, get) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  cacheTimestamp: getStoredCacheTimestamp(),
  swRegistration: null,
  checking: false,

  setOnline: (val) => set({ isOnline: val }),

  setCacheTimestamp: (ts) => {
    try { localStorage.setItem(CACHE_TS_KEY, String(ts)) } catch { /* ignored */ }
    set({ cacheTimestamp: ts })
  },

  setSwRegistration: (reg) => set({ swRegistration: reg }),

  checkForUpdates: async () => {
    const { swRegistration } = get()
    if (!swRegistration) return
    set({ checking: true })
    try {
      await swRegistration.update()
    } catch { /* network error is fine — we're probably offline */ }
    set({ checking: false })
  },

  clearCacheAndReload: async () => {
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map(k => caches.delete(k)))
    }
    try { localStorage.removeItem(CACHE_TS_KEY) } catch { /* ignored */ }
    window.location.reload()
  },
}))

// Listen for online/offline events
window.addEventListener('online', () => usePWAStore.getState().setOnline(true))
window.addEventListener('offline', () => usePWAStore.getState().setOnline(false))
