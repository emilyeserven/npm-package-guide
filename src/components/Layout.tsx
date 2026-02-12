import { useState, useEffect, useCallback } from 'react'
import { Outlet } from '@tanstack/react-router'
import { FloatingHeader } from './FloatingHeader'
import { Sidebar } from './Sidebar'
import { CommandMenu } from './CommandMenu'
import { GlossaryTooltip } from './GlossaryTooltip'
import { FootnoteTooltip } from './FootnoteTooltip'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cmdMenuOpen, setCmdMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll shadow on header
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Toggle body class for sidebar CSS transitions
  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen)
  }, [sidebarOpen])

  // Close sidebar on Escape, open command palette on Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCmdMenuOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const openCmdMenu = useCallback(() => setCmdMenuOpen(true), [])

  return (
    <>
      <FloatingHeader
        scrolled={scrolled}
        onMenuToggle={() => setSidebarOpen(true)}
        onSearchClick={openCmdMenu}
      />
      <div className="mx-auto max-w-4xl px-5 pt-18 pb-15 max-sm:px-3.5 max-sm:pt-16 max-sm:pb-10">
        <Outlet />
      </div>
      <div
        className="sidebar-overlay fixed inset-0 bg-slate-900/30 dark:bg-black/50 backdrop-blur-sm z-90 opacity-0 pointer-events-none transition-opacity duration-250"
        onClick={() => setSidebarOpen(false)}
        data-testid="sidebar-overlay"
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <CommandMenu open={cmdMenuOpen} onOpenChange={setCmdMenuOpen} />
      <GlossaryTooltip />
      <FootnoteTooltip />
    </>
  )
}
