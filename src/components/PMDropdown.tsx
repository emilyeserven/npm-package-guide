import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { usePM } from '../hooks/usePMContext'

export function PMDropdown() {
  const [open, setOpen] = useState(false)
  const { currentPM, setPM } = usePM()
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const handler = () => setOpen(false)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open])

  return (
    <>
      <button
        className="header-pm-btn"
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
      >
        <span>{currentPM}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
      <div className={`pm-dropdown ${open ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button
          className={`pm-dropdown-item ${currentPM === 'npm' ? 'active' : ''}`}
          onClick={() => { setPM('npm'); setOpen(false) }}
        >
          <span className="pm-check">{currentPM === 'npm' ? '✓' : ''}</span> npm
        </button>
        <button
          className={`pm-dropdown-item ${currentPM === 'pnpm' ? 'active' : ''}`}
          onClick={() => { setPM('pnpm'); setOpen(false) }}
        >
          <span className="pm-check">{currentPM === 'pnpm' ? '✓' : ''}</span> pnpm
        </button>
        <div className="pm-dropdown-divider" />
        <button
          className="pm-dropdown-item pm-dropdown-link"
          onClick={() => {
            setOpen(false)
            navigate({ to: '/$sectionId', params: { sectionId: 'npm-vs-pnpm' } })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          npm vs pnpm
        </button>
      </div>
    </>
  )
}
