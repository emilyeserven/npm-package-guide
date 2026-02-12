import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'sidebar-pinned'
const DESKTOP_QUERY = '(min-width: 1024px)'

function getInitialPinned(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch { /* ignored */ }
  return false
}

export function useSidebarPin() {
  const [pinned, setPinned] = useState(getInitialPinned)
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia?.(DESKTOP_QUERY).matches ?? false
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(pinned))
    } catch { /* ignored */ }
  }, [pinned])

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const effectivelyPinned = pinned && isDesktop

  const togglePin = useCallback(() => setPinned(prev => !prev), [])
  const unpin = useCallback(() => setPinned(false), [])

  return { pinned, effectivelyPinned, togglePin, unpin }
}
