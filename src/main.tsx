import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { registerSW } from 'virtual:pwa-register'
import { router } from './router'
import { usePWAStore } from './hooks/usePWAStore'
import './App.css'

registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (registration) {
      usePWAStore.getState().setSwRegistration(registration)
      // Record initial cache timestamp if not already set
      if (!usePWAStore.getState().cacheTimestamp) {
        usePWAStore.getState().setCacheTimestamp(Date.now())
      }
      // Check for SW updates every 15 minutes while the page is open
      setInterval(() => {
        registration.update().catch(() => { /* offline — ignore */ })
      }, 15 * 60 * 1000)
    }
  },
  onOfflineReady() {
    usePWAStore.getState().setCacheTimestamp(Date.now())
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
