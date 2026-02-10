import { useState, useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { FloatingHeader } from './FloatingHeader'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  // Close sidebar on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <FloatingHeader
        scrolled={scrolled}
        onMenuToggle={() => setSidebarOpen(true)}
      />
      <div className="container">
        <Outlet />
      </div>
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
