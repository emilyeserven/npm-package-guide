import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
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
        className="flex items-center gap-1.5 font-sans text-[11px] font-semibold h-9 px-2.5 rounded-[9px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all duration-150 whitespace-nowrap hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
      >
        <span>{currentPM}</span>
        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
      <div
        className={clsx(
          'absolute top-full right-0 mt-1.5 min-w-[140px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg dark:shadow-black/30 py-1 transition-all duration-150 origin-top-right',
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={clsx(
            'flex items-center w-full px-3 py-1.5 text-[13px] bg-transparent border-none cursor-pointer transition-colors duration-150',
            currentPM === 'npm'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          )}
          onClick={() => { setPM('npm'); setOpen(false) }}
        >
          <span className="w-5 text-[11px] text-blue-500 dark:text-blue-400">{currentPM === 'npm' ? '✓' : ''}</span> npm
        </button>
        <button
          className={clsx(
            'flex items-center w-full px-3 py-1.5 text-[13px] bg-transparent border-none cursor-pointer transition-colors duration-150',
            currentPM === 'pnpm'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          )}
          onClick={() => { setPM('pnpm'); setOpen(false) }}
        >
          <span className="w-5 text-[11px] text-blue-500 dark:text-blue-400">{currentPM === 'pnpm' ? '✓' : ''}</span> pnpm
        </button>
        <div className="mx-2.5 my-1 h-px bg-slate-200 dark:bg-slate-700" />
        <button
          className="flex items-center w-full px-3 py-1.5 text-[13px] text-slate-700 dark:text-slate-300 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={() => {
            setOpen(false)
            navigate({ to: '/$sectionId', params: { sectionId: 'npm-vs-pnpm' } })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="w-5" />npm vs pnpm
        </button>
      </div>
    </>
  )
}
