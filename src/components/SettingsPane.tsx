import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { usePM } from '../hooks/usePMContext'
import { useTheme } from '../hooks/useTheme'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface SettingsPaneProps {
  open: boolean
  onClose: () => void
}

export function SettingsPane({ open, onClose }: SettingsPaneProps) {
  const { currentPM, setPM } = usePM()
  const { theme, toggleTheme } = useTheme()
  const navigateToSection = useNavigateToSection()
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus the close button when the pane opens
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  const activeCls = 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border-blue-200 dark:border-blue-500/30'
  const inactiveCls = 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'

  return (
    <div
      data-testid="settings-pane"
      role="dialog"
      aria-label="Settings"
      className={clsx(
        'fixed top-0 right-0 bottom-0 w-72 max-sm:w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 z-100 flex flex-col transition-[translate] duration-250',
        open ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Settings</span>
        <button
          ref={closeRef}
          className="flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-lg text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
          onClick={onClose}
          data-testid="settings-pane-close"
        >
          &#x2715;
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
        {/* Appearance */}
        <div>
          <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">Appearance</div>
          <div className="flex gap-2">
            <button
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border cursor-pointer transition-all duration-150',
                theme === 'light' ? activeCls : inactiveCls
              )}
              onClick={() => { if (theme !== 'light') toggleTheme() }}
              data-testid="theme-option-light"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              Light
            </button>
            <button
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border cursor-pointer transition-all duration-150',
                theme === 'dark' ? activeCls : inactiveCls
              )}
              onClick={() => { if (theme !== 'dark') toggleTheme() }}
              data-testid="theme-option-dark"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Dark
            </button>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-700" />

        {/* Package Manager */}
        <div>
          <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1">
            Package Manager
            <button
              className="relative inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-gray-400 dark:border-slate-500 text-gray-400 dark:text-slate-500 bg-transparent cursor-pointer text-[9px] leading-none font-bold transition-colors duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 group/help p-0"
              onClick={() => {
                onClose()
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
          <div className="flex gap-2">
            <button
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg border cursor-pointer transition-all duration-150',
                currentPM === 'npm' ? activeCls : inactiveCls
              )}
              onClick={() => setPM('npm')}
              data-testid="pm-option-npm"
            >
              npm
            </button>
            <button
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg border cursor-pointer transition-all duration-150',
                currentPM === 'pnpm' ? activeCls : inactiveCls
              )}
              onClick={() => setPM('pnpm')}
              data-testid="pm-option-pnpm"
            >
              pnpm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
