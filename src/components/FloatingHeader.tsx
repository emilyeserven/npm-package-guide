import { useNavigate, useParams } from '@tanstack/react-router'
import clsx from 'clsx'
import { PMDropdown } from './PMDropdown'
import { useTheme } from '../hooks/useTheme'

interface FloatingHeaderProps {
  scrolled: boolean
  onMenuToggle: () => void
}

export function FloatingHeader({ scrolled, onMenuToggle }: FloatingHeaderProps) {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const sectionId = params.sectionId || 'roadmap'
  const isHome = sectionId === 'roadmap'
  const { theme, toggleTheme } = useTheme()

  const handleHomeClick = () => {
    navigate({ to: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={clsx(
      'floating-header fixed top-0 left-0 right-0 z-50 bg-white/92 dark:bg-slate-900/92 backdrop-blur-[12px] border-b border-slate-200 dark:border-slate-700 px-5 transition-shadow duration-200',
      scrolled && 'shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
    )}>
      <div className="mx-auto max-w-[840px] flex items-center h-[52px] gap-3.5">
        <button
          className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-[9px] cursor-pointer shrink-0 transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-[0_2px_6px_rgba(59,130,246,0.1)]"
          onClick={onMenuToggle}
          aria-label="Open navigation"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="block w-3.5 h-[1.5px] bg-current rounded-sm" />
            <span className="block w-3.5 h-[1.5px] bg-current rounded-sm" />
            <span className="block w-3.5 h-[1.5px] bg-current rounded-sm" />
          </span>
        </button>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-[600px]:text-[13px]">
          Web App vs. NPM Package Guide
        </span>
        <div className="ml-auto relative shrink-0 flex items-center gap-2">
          {!isHome && (
            <button
              className="flex items-center gap-[5px] font-sans text-[11px] font-semibold h-9 px-2.5 rounded-lg bg-transparent text-gray-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all duration-150 whitespace-nowrap hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={handleHomeClick}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Start Here
            </button>
          )}
          <button
            className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-[9px] cursor-pointer shrink-0 transition-all duration-150 text-base leading-none p-0 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-[0_2px_6px_rgba(59,130,246,0.1)]"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg className="w-[18px] h-[18px] stroke-current fill-none [stroke-width:2] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px] stroke-current fill-none [stroke-width:2] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24">
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
          </button>
          <PMDropdown />
        </div>
      </div>
    </div>
  )
}
