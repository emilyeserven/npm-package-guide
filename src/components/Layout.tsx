import { useState, useEffect, useCallback } from 'react'
import { Outlet } from '@tanstack/react-router'
import clsx from 'clsx'
import { FloatingHeader } from './FloatingHeader'
import { Sidebar } from './Sidebar'
import { CommandMenu } from './CommandMenu'
import { GlossaryTooltip } from './GlossaryTooltip'
import { FootnoteTooltip } from './FootnoteTooltip'
import { useSidebarPin } from '../hooks/useSidebarPin'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cmdMenuOpen, setCmdMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hasActiveGuide, setHasActiveGuide] = useState(false)
  const { effectivelyPinned, unpin } = useSidebarPin()

  const sidebarVisible = sidebarOpen || effectivelyPinned

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
      <FloatingHeader
        scrolled={scrolled}
        onMenuToggle={handleMenuToggle}
        onSearchClick={openCmdMenu}
        effectivelyPinned={effectivelyPinned}
        hasActiveGuide={hasActiveGuide}
      />
      <div className={clsx(
        'mx-auto max-w-4xl px-5 pt-18 pb-15 max-sm:px-3.5 max-sm:pt-16 max-sm:pb-10 transition-[margin-left] duration-250',
        effectivelyPinned && (hasActiveGuide ? 'lg:ml-90' : 'lg:ml-[52px]')
      )}>
        <Outlet />
      </div>
      <div
        className="sidebar-overlay fixed inset-0 bg-slate-900/30 dark:bg-black/50 backdrop-blur-sm z-90 opacity-0 pointer-events-none transition-opacity duration-250"
        onClick={handleSidebarClose}
        data-testid="sidebar-overlay"
      />
      <Sidebar
        open={sidebarVisible}
        onClose={handleSidebarClose}
        onActiveGuideChange={setHasActiveGuide}
      />
      <CommandMenu open={cmdMenuOpen} onOpenChange={setCmdMenuOpen} />
      <GlossaryTooltip />
      <FootnoteTooltip />
    </>
  )
}
