import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { checklistPages, guides, getGuideForPage } from '../data/guideRegistry'
import { useUIStore } from '../hooks/useUIStore'
import { copyPageAsMarkdown } from '../helpers/copyAsMarkdown'

function getGuideInfo(sectionId: string | undefined): { title: string; homeId: string | null; isChecklist: boolean } {
  if (!sectionId) return { title: 'Dev Guides', homeId: null, isChecklist: false }

  // Check if it's a checklist page
  const checklistPage = checklistPages.find(cp => cp.id === sectionId)
  if (checklistPage) {
    const sourceGuide = guides.find(g => g.id === checklistPage.sourceGuideId)
    return {
      title: 'Checklists',
      homeId: sourceGuide?.startPageId ?? null,
      isChecklist: true,
    }
  }

  if (sectionId === 'external-resources' || sectionId === 'glossary')
    return { title: 'Dev Guides', homeId: null, isChecklist: false }

  // Dynamically resolve guide from the registry
  const guide = getGuideForPage(sectionId)
  if (guide && !guide.singlePage) {
    return { title: guide.title, homeId: guide.startPageId, isChecklist: false }
  }

  return { title: 'Dev Guides', homeId: null, isChecklist: false }
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export function FloatingHeader() {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const scrolled = useUIStore((s) => s.scrolled)
  const effectivelyPinned = useUIStore((s) => s.pinned && s.isDesktop)
  const hasActiveGuide = useUIStore((s) => s.hasActiveGuide)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const setCmdMenuOpen = useUIStore((s) => s.setCmdMenuOpen)

  const [copied, setCopied] = useState(false)

  const isGuidesIndex = !params.sectionId
  const { title: guideTitle, homeId, isChecklist } = getGuideInfo(params.sectionId)
  const showHomeButton = !isGuidesIndex && homeId !== null && homeId !== params.sectionId

  const handleCopyMarkdown = async () => {
    const ok = await copyPageAsMarkdown()
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleHomeClick = () => {
    navigate({ to: '/$sectionId', params: { sectionId: homeId! } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={clsx(
      'floating-header fixed top-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-5 transition-[left,box-shadow] duration-250',
      scrolled && 'shadow-md dark:shadow-lg',
      effectivelyPinned ? (hasActiveGuide ? 'left-0 lg:left-90' : 'left-0 lg:left-[52px]') : 'left-0'
    )}>
      <div className="mx-auto max-w-4xl flex items-center h-13 gap-3.5">
        <button
          className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg cursor-pointer shrink-0 transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/10"
          onClick={toggleSidebar}
          aria-label="Open navigation"
          data-testid="menu-toggle"
        >
          <span className="flex flex-col gap-1">
            <span className="block w-3.5 h-0.5 bg-current rounded-sm" />
            <span className="block w-3.5 h-0.5 bg-current rounded-sm" />
            <span className="block w-3.5 h-0.5 bg-current rounded-sm" />
          </span>
        </button>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-sm:text-sm">
          {guideTitle}
        </span>
        <div className="ml-auto relative shrink-0 flex items-center gap-2">
          {showHomeButton && (
            <button
              className="flex items-center gap-1.5 font-sans text-xs font-semibold h-9 px-2.5 rounded-lg bg-transparent text-gray-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all duration-150 whitespace-nowrap hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={handleHomeClick}
              aria-label={isChecklist ? 'Go to guide' : 'Go to start page'}
              data-testid="home-button"
            >
              {isChecklist ? (
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
              ) : (
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              )}
              {isChecklist ? 'Go to Guide' : 'Start Here'}
            </button>
          )}
          <button
            className={clsx(
              'group relative flex items-center justify-center w-9 h-9 border rounded-lg cursor-pointer shrink-0 transition-all duration-150',
              copied
                ? 'border-green-400 dark:border-green-500 text-green-600 dark:text-green-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/10'
            )}
            onClick={handleCopyMarkdown}
            aria-label="Copy page as markdown"
            data-testid="copy-markdown-button"
          >
            {copied ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
          <button
            className="group relative flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg cursor-pointer shrink-0 transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/10"
            onClick={() => setCmdMenuOpen(true)}
            aria-label="Search pages"
            data-testid="search-button"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-0.5 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-md whitespace-nowrap pointer-events-none">
              <kbd className="font-sans">{isMac ? '\u2318' : 'Ctrl'}</kbd>
              <kbd className="font-sans">K</kbd>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
