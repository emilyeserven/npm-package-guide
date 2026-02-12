import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { usePM } from '../hooks/usePMContext'
import { useTheme } from '../hooks/useTheme'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface OptionsDropdownProps {
  position?: 'header' | 'sidebar'
}

export function OptionsDropdown({ position = 'header' }: OptionsDropdownProps) {
  const [open, setOpen] = useState(false)
  const { currentPM, setPM } = usePM()
  const { theme, toggleTheme } = useTheme()
  const navigateToSection = useNavigateToSection()

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
        className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg cursor-pointer shrink-0 transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/10"
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        aria-label="Options"
        data-testid="options-dropdown-toggle"
      >
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
      <div
        className={clsx(
          'absolute min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg dark:shadow-black/30 py-1 transition-all duration-150',
          position === 'sidebar'
            ? 'left-full bottom-0 ml-1.5 origin-bottom-left'
            : 'top-full right-0 mt-1.5 origin-top-right',
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Appearance</div>
        <button
          className="flex items-center w-full px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-700"
          onClick={toggleTheme}
          data-testid="theme-toggle"
        >
          <span className="w-5 text-base leading-none shrink-0">
            {theme === 'light' ? (
              <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </span>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>

        <div className="mx-2.5 my-1 h-px bg-slate-200 dark:bg-slate-700" />

        <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
          Package Manager
          <button
            className="relative inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-gray-400 dark:border-slate-500 text-gray-400 dark:text-slate-500 bg-transparent cursor-pointer text-[9px] leading-none font-bold transition-colors duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 group/help p-0"
            onClick={() => {
              setOpen(false)
              navigateToSection('npm-vs-pnpm')
            }}
            aria-label="Learn about npm vs pnpm"
            data-testid="pm-compare-link"
          >
            ?
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[11px] font-normal normal-case tracking-normal text-white dark:text-slate-200 bg-slate-800 dark:bg-slate-600 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 group-hover/help:opacity-100">
              Not sure which to pick? Learn more
            </span>
          </button>
        </div>
        <button
          className={clsx(
            'flex items-center w-full px-3 py-1.5 text-sm bg-transparent border-none cursor-pointer transition-colors duration-150',
            currentPM === 'npm'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          )}
          onClick={() => { setPM('npm'); setOpen(false) }}
          data-testid="pm-option-npm"
        >
          <span className="w-5 text-xs text-blue-500 dark:text-blue-400">{currentPM === 'npm' ? '\u2713' : ''}</span> npm
        </button>
        <button
          className={clsx(
            'flex items-center w-full px-3 py-1.5 text-sm bg-transparent border-none cursor-pointer transition-colors duration-150',
            currentPM === 'pnpm'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          )}
          onClick={() => { setPM('pnpm'); setOpen(false) }}
          data-testid="pm-option-pnpm"
        >
          <span className="w-5 text-xs text-blue-500 dark:text-blue-400">{currentPM === 'pnpm' ? '\u2713' : ''}</span> pnpm
        </button>
      </div>
    </>
  )
}
