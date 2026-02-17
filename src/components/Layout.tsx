import { useState, useEffect, useCallback, useRef } from 'react'
import { Outlet, useParams } from '@tanstack/react-router'
import clsx from 'clsx'
import { FloatingHeader } from './FloatingHeader'
import { Sidebar } from './Sidebar'
import { CommandMenu } from './CommandMenu'
import { GlossaryTooltip } from './GlossaryTooltip'
import { FootnoteTooltip } from './FootnoteTooltip'
import { useSidebarPin } from '../hooks/useSidebarPin'
import { getNavTitle } from '../data/navigation'
import { parseTitle } from '../helpers/parseTitle'

const BASE_TITLE = 'Dev Guides'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cmdMenuOpen, setCmdMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hasActiveGuide, setHasActiveGuide] = useState(false)
  const { effectivelyPinned, togglePin, unpin } = useSidebarPin()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const sectionId = params.sectionId
  const prevSectionRef = useRef(sectionId)

  const sidebarVisible = sidebarOpen || effectivelyPinned

  // Update document title on route changes
  useEffect(() => {
    if (!sectionId) {
      document.title = BASE_TITLE
      return
    }
    const navTitle = getNavTitle(sectionId)
    const { text } = parseTitle(navTitle)
    document.title = text !== sectionId ? `${text} | ${BASE_TITLE}` : BASE_TITLE
  }, [sectionId])

  // Focus main content on route changes (not initial load)
  useEffect(() => {
    if (prevSectionRef.current === sectionId) return
    prevSectionRef.current = sectionId
    requestAnimationFrame(() => {
      const main = document.getElementById('main-content')
      if (main) main.focus({ preventScroll: true })
    })
  }, [sectionId])

  // Scroll shadow on header
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Toggle body class for sidebar overlay CSS — only in non-pinned mode
  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen && !effectivelyPinned)
  }, [sidebarOpen, effectivelyPinned])

  // Close sidebar on Escape, open command palette on Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (effectivelyPinned) unpin()
        setSidebarOpen(false)
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCmdMenuOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [effectivelyPinned, unpin])

  const openCmdMenu = useCallback(() => setCmdMenuOpen(true), [])

  const handleMenuToggle = useCallback(() => {
    if (effectivelyPinned) {
      unpin()
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [effectivelyPinned, unpin])

  const handleSidebarClose = useCallback(() => {
    if (effectivelyPinned) unpin()
    setSidebarOpen(false)
  }, [effectivelyPinned, unpin])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
        onClick={(e) => {
          e.preventDefault()
          const main = document.getElementById('main-content')
          if (main) main.focus({ preventScroll: false })
        }}
      >
        Skip to main content
      </a>
      <FloatingHeader
        scrolled={scrolled}
        onMenuToggle={handleMenuToggle}
        onSearchClick={openCmdMenu}
        effectivelyPinned={effectivelyPinned}
        hasActiveGuide={hasActiveGuide}
      />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className={clsx(
          'mx-auto max-w-4xl px-5 pt-18 pb-15 max-sm:px-3.5 max-sm:pt-16 max-sm:pb-10 transition-[margin-left] duration-250',
          effectivelyPinned && (hasActiveGuide ? 'lg:ml-90' : 'lg:ml-[52px]')
        )}>
          <Outlet />
        </div>
      </main>
      <div
        className="sidebar-overlay fixed inset-0 bg-slate-900/30 dark:bg-black/50 backdrop-blur-sm z-90 opacity-0 pointer-events-none transition-opacity duration-250"
        onClick={handleSidebarClose}
        aria-hidden="true"
        data-testid="sidebar-overlay"
      />
      <Sidebar
        open={sidebarVisible}
        onClose={handleSidebarClose}
        pinned={effectivelyPinned}
        onTogglePin={togglePin}
        onActiveGuideChange={setHasActiveGuide}
      />
      <CommandMenu open={cmdMenuOpen} onOpenChange={setCmdMenuOpen} />
      <GlossaryTooltip />
      <FootnoteTooltip />
    </>
  )
}
