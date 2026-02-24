import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { guides, getGuideForPage, checklistsNavDef, singlePageNavDef, checklistPages, type GuideDefinition } from '../data/guideRegistry'
import { getNavTitle } from '../data/navigation'
import { contentPages } from '../content/registry'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { STORYBOOK_URL } from '../data/navigation'
import { parseTitle } from '../helpers/parseTitle'
import { usePM } from '../hooks/usePMContext'
import { useTheme } from '../hooks/useTheme'
import { useUIStore } from '../hooks/useUIStore'
import { usePWAStore } from '../hooks/usePWAStore'

// ── Title resolution ────────────────────────────────────────────────

function resolveItems(ids: string[]) {
  return ids
    .map(id => {
      const title = getNavTitle(id)
      return title !== id ? { id, title } : null
    })
    .filter((item): item is { id: string; title: string } => item !== null)
}

// ── Sub-components ────────────────────────────────────────────────────

// Severity badge colors for Common AI Mistakes sidebar items
const severityBadges: Record<string, { letter: string; cls: string }> = {
  'prompt-mistakes-logic': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-apis': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-react': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-security': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-structural': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-design': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-tailwind': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-testing': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-style': { letter: 'L', cls: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' },
}

function SidebarItem({ id, title, active, onClick }: { id: string; title: string; active: boolean; onClick: (id: string) => void }) {
  const { text, icon } = parseTitle(title)
  const badge = severityBadges[id]
  return (
    <button
      className={clsx(
        'flex items-center justify-between w-full text-left px-3.5 py-1.5 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
        active
          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
      )}
      onClick={() => onClick(id)}
      aria-current={active ? 'page' : undefined}
      data-testid={`sidebar-item-${id}`}
    >
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      {badge ? (
        <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold shrink-0 ${badge.cls}`}>{badge.letter}</span>
      ) : icon ? (
        <span className="text-base leading-none opacity-70 shrink-0" aria-hidden="true">{icon}</span>
      ) : null}
    </button>
  )
}

function IconRail({
  activeGuideId,
  showSettings,
  onSelectGuide,
  onHomeClick,
  onResourceClick,
  onSettingsClick,
  currentId,
}: {
  activeGuideId: string | null
  showSettings: boolean
  onSelectGuide: (guideId: string) => void
  onHomeClick: () => void
  onResourceClick: (id: string) => void
  onSettingsClick: () => void
  currentId: string
}) {
  const iconBtnCls = 'flex items-center justify-center w-10 h-10 shrink-0 rounded-lg border-none cursor-pointer transition-all duration-150'
  const activeCls = 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
  const inactiveCls = 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'

  const railRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{ text: string; top: number } | null>(null)

  const showTooltip = useCallback((text: string, e: React.MouseEvent) => {
    const btnRect = e.currentTarget.getBoundingClientRect()
    const railRect = railRef.current?.getBoundingClientRect()
    if (!railRect) return
    setTooltip({ text, top: btnRect.top - railRect.top + btnRect.height / 2 })
  }, [])
  const hideTooltip = useCallback(() => setTooltip(null), [])

  return (
    <div ref={railRef} className="flex flex-col items-center w-[52px] shrink-0 border-r border-slate-200 dark:border-slate-700 py-3 gap-1 h-full relative">
      {/* Home button */}
      <Link
        to="/"
        className={clsx(iconBtnCls, !currentId ? activeCls : inactiveCls)}
        onClick={onHomeClick}
        onMouseEnter={(e) => showTooltip('Home', e)}
        onMouseLeave={hideTooltip}
        aria-label="Home"
        data-testid="sidebar-home-icon"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </Link>

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5 shrink-0" />

      {/* Guide icons – scrollable when viewport is short */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center gap-1 scrollbar-hide">
        {guides.filter(g => !g.singlePage).map(guide => (
          <button
            key={guide.id}
            className={clsx(iconBtnCls, activeGuideId === guide.id ? activeCls : inactiveCls)}
            onClick={() => onSelectGuide(guide.id)}
            onMouseEnter={(e) => showTooltip(guide.title, e)}
            onMouseLeave={hideTooltip}
            aria-label={guide.title}
            data-testid={`sidebar-guide-icon-${guide.id}`}
          >
            <span className="text-lg leading-none w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">{guide.icon}</span>
          </button>
        ))}

        {/* Single Page Guides (combined) */}
        <button
          className={clsx(iconBtnCls, activeGuideId === 'single-page-guides' ? activeCls : inactiveCls)}
          onClick={() => onSelectGuide('single-page-guides')}
          onMouseEnter={(e) => showTooltip('Single Page Guides', e)}
          onMouseLeave={hideTooltip}
          aria-label="Single Page Guides"
          data-testid="sidebar-guide-icon-single-page-guides"
        >
          <span className="text-lg leading-none w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">{'\u{1F4C4}'}</span>
        </button>
      </div>

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5 shrink-0" />

      {/* Checklists icon */}
      <button
        className={clsx(iconBtnCls, activeGuideId === 'checklists' ? activeCls : inactiveCls)}
        onClick={() => onSelectGuide('checklists')}
        onMouseEnter={(e) => showTooltip('Checklists', e)}
        onMouseLeave={hideTooltip}
        aria-label="Checklists"
        data-testid="sidebar-icon-checklists"
      >
        <span className="text-lg leading-none w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">{'\u2705'}</span>
      </button>

      {/* Resource icons */}
      <button
        className={clsx(iconBtnCls, currentId === 'external-resources' ? activeCls : inactiveCls)}
        onClick={() => onResourceClick('external-resources')}
        onMouseEnter={(e) => showTooltip('External Resources', e)}
        onMouseLeave={hideTooltip}
        aria-label="External Resources"
        data-testid="sidebar-icon-external-resources"
      >
        <span className="text-lg leading-none w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">{'\u{1F4DA}'}</span>
      </button>
      <button
        className={clsx(iconBtnCls, currentId === 'glossary' ? activeCls : inactiveCls)}
        onClick={() => onResourceClick('glossary')}
        onMouseEnter={(e) => showTooltip('Glossary', e)}
        onMouseLeave={hideTooltip}
        aria-label="Glossary"
        data-testid="sidebar-icon-glossary"
      >
        <span className="text-lg leading-none w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">{'\u{1F4D6}'}</span>
      </button>
      <button
        className={clsx(iconBtnCls, inactiveCls)}
        onClick={() => window.open(STORYBOOK_URL, '_blank', 'noopener,noreferrer')}
        onMouseEnter={(e) => showTooltip('Storybook', e)}
        onMouseLeave={hideTooltip}
        aria-label="Open Storybook"
        data-testid="sidebar-icon-storybook"
      >
        <span className="text-lg leading-none w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">{'\u{1F3A8}'}</span>
      </button>

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5 shrink-0" />

      {/* Settings */}
      <button
        className={clsx(iconBtnCls, showSettings ? activeCls : inactiveCls)}
        onClick={onSettingsClick}
        onMouseEnter={(e) => showTooltip('Settings', e)}
        onMouseLeave={hideTooltip}
        aria-label="Settings"
        data-testid="settings-pane-toggle"
      >
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {/* Tooltip – rendered outside scroll container so it's never clipped */}
      {tooltip && (
        <div
          className="absolute left-full ml-2 px-2 py-1 text-[11px] font-normal text-white dark:text-slate-200 bg-slate-800 dark:bg-slate-600 rounded whitespace-nowrap pointer-events-none z-50 hidden lg:block"
          style={{ top: tooltip.top, transform: 'translateY(-50%)' }}
          aria-hidden="true"
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}

function PinIcon({ pinned }: { pinned: boolean }) {
  return (
    <svg
      className={clsx(
        'w-4 h-4 transition-all duration-150',
        pinned
          ? 'text-blue-500 dark:text-blue-400'
          : 'text-gray-400 dark:text-slate-500 rotate-45'
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  )
}

function ContentPanel({
  guide,
  currentId,
  onNav,
  onResourceNav,
  pinned,
  onTogglePin,
  onClose,
}: {
  guide: GuideDefinition
  currentId: string
  onNav: (id: string) => void
  onResourceNav: (id: string, guideId: string) => void
  pinned: boolean
  onTogglePin: () => void
  onClose: () => void
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {guide.singlePage ? 'Single Page Guides' : guide.title}
        </span>
        <div className="flex items-center gap-0.5 shrink-0 ml-2">
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onTogglePin}
            aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            title={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            data-testid="sidebar-pin"
          >
            <PinIcon pinned={pinned} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-lg text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onClose}
            aria-label="Close sidebar"
            data-testid="sidebar-close"
          >
            &#x2715;
          </button>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
        {guide.sections.map((section, idx) => (
          <div key={idx}>
            {section.label && (
              <div className={clsx(
                'text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-3.5',
                idx === 0 ? 'mt-1' : 'mt-4'
              )}>
                {section.label}
              </div>
            )}
            {resolveItems(section.ids).map(item => (
              <SidebarItem
                key={item.id}
                {...item}
                active={currentId === item.id || (item.id === 'arch-start' && currentId === 'architecture')}
                onClick={onNav}
              />
            ))}
          </div>
        ))}

        {/* Auto-generated Resources section for real guides */}
        {guide.id !== 'checklists' && !guide.singlePage && (() => {
          const checklist = checklistPages.find(cp => cp.sourceGuideId === guide.id)
          const checklistTitle = checklist
            ? parseTitle(contentPages.get(checklist.id)?.title ?? getNavTitle(checklist.id)).text
            : null
          return (
            <div>
              <div className="mt-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-3.5">
                Resources
              </div>
              <button
                className={clsx(
                  'flex items-center justify-between w-full text-left px-3.5 py-1.5 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
                  currentId === 'external-resources'
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
                onClick={() => onResourceNav('external-resources', guide.id)}
              >
                <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">External Resources</span>
                <span className="text-base leading-none opacity-70 shrink-0" aria-hidden="true">{'\u{1F4DA}'}</span>
              </button>
              <button
                className={clsx(
                  'flex items-center justify-between w-full text-left px-3.5 py-1.5 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
                  currentId === 'glossary'
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
                onClick={() => onResourceNav('glossary', guide.id)}
              >
                <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">Glossary</span>
                <span className="text-base leading-none opacity-70 shrink-0" aria-hidden="true">{'\u{1F4D6}'}</span>
              </button>
              {checklist && checklistTitle && (
                <button
                  className={clsx(
                    'flex items-center justify-between w-full text-left px-3.5 py-1.5 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
                    currentId === checklist.id
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                  onClick={() => onNav(checklist.id)}
                >
                  <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{checklistTitle}</span>
                  <span className="text-base leading-none opacity-70 shrink-0" aria-hidden="true">{'\u2705'}</span>
                </button>
              )}
            </div>
          )
        })()}
      </div>
    </div>
  )
}

function formatCacheAge(ts: number | null): string {
  if (!ts) return 'Unknown'
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function SettingsPanel({
  pinned,
  onTogglePin,
  onClose,
  onNav,
}: {
  pinned: boolean
  onTogglePin: () => void
  onClose: () => void
  onNav: (id: string) => void
}) {
  const { currentPM, setPM } = usePM()
  const { theme, toggleTheme } = useTheme()
  const isOnline = usePWAStore((s) => s.isOnline)
  const cacheTimestamp = usePWAStore((s) => s.cacheTimestamp)
  const checking = usePWAStore((s) => s.checking)
  const checkForUpdates = usePWAStore((s) => s.checkForUpdates)
  const clearCacheAndReload = usePWAStore((s) => s.clearCacheAndReload)

  const activeCls = 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border-blue-200 dark:border-blue-500/30'
  const inactiveCls = 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          Settings
        </span>
        <div className="flex items-center gap-0.5 shrink-0 ml-2">
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onTogglePin}
            aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            title={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            data-testid="sidebar-pin"
          >
            <PinIcon pinned={pinned} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-lg text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onClose}
            aria-label="Close sidebar"
            data-testid="sidebar-close"
          >
            &#x2715;
          </button>
        </div>
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
              aria-pressed={theme === 'light'}
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
              aria-pressed={theme === 'dark'}
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
              onClick={() => onNav('npm-vs-pnpm')}
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
              aria-pressed={currentPM === 'npm'}
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
              aria-pressed={currentPM === 'pnpm'}
              data-testid="pm-option-pnpm"
            >
              pnpm
            </button>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-700" />

        {/* App Status */}
        <div>
          <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">App Status</div>

          {/* Online indicator */}
          <div className="flex items-center gap-2 mb-3">
            <span className={clsx(
              'w-2 h-2 rounded-full shrink-0',
              isOnline ? 'bg-green-500' : 'bg-red-500'
            )} />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Cache age */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">Cache updated</span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300" data-testid="cache-age">
              {formatCacheAge(cacheTimestamp)}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              className={clsx(
                'flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border cursor-pointer transition-all duration-150',
                inactiveCls,
                checking && 'opacity-60 pointer-events-none'
              )}
              onClick={checkForUpdates}
              disabled={checking}
              data-testid="check-updates-btn"
            >
              <svg className={clsx('w-4 h-4', checking && 'animate-spin')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {checking ? 'Checking...' : 'Check for Updates'}
            </button>
            <button
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border cursor-pointer transition-all duration-150 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10"
              onClick={clearCacheAndReload}
              data-testid="clear-cache-btn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Clear Cache &amp; Reload
            </button>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
            If new guides aren't showing, try checking for updates or clearing the cache.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Main Sidebar ──────────────────────────────────────────────────────

export function Sidebar() {
  const navigateToSection = useNavigateToSection()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const currentId = params.sectionId || ''

  const sidebarVisible = useUIStore((s) => s.sidebarOpen || (s.pinned && s.isDesktop))
  const pinned = useUIStore((s) => s.pinned)
  const togglePin = useUIStore((s) => s.togglePin)
  const closeSidebar = useUIStore((s) => s.closeSidebar)
  const setHasActiveGuide = useUIStore((s) => s.setHasActiveGuide)

  const [activeGuideId, setActiveGuideId] = useState<string | null>(() => {
    return getGuideForPage(currentId)?.id ?? null
  })
  const [showSettings, setShowSettings] = useState(false)

  // Re-sync active guide when sidebar transitions from closed to open
  const [prevOpen, setPrevOpen] = useState(false)
  if (sidebarVisible !== prevOpen) {
    setPrevOpen(sidebarVisible)
    if (sidebarVisible && !showSettings) {
      const expected = getGuideForPage(currentId)?.id ?? null
      if (expected !== activeGuideId) {
        setActiveGuideId(expected)
      }
    }
  }

  const activeGuide = activeGuideId === 'checklists'
    ? checklistsNavDef
    : activeGuideId === 'single-page-guides'
      ? singlePageNavDef
      : guides.find(g => g.id === activeGuideId) ?? null
  const hasExpandedPanel = activeGuide !== null || showSettings

  // Notify store when expanded panel state changes (for layout margin adjustments)
  useEffect(() => {
    setHasActiveGuide(hasExpandedPanel)
  }, [hasExpandedPanel, setHasActiveGuide])

  const handleNav = (id: string) => {
    if (!pinned) closeSidebar()
    navigateToSection(id)
  }

  const handleGuidesHome = () => {
    if (!pinned) closeSidebar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResourceClick = (id: string) => {
    setActiveGuideId(null)
    setShowSettings(false)
    if (!pinned) closeSidebar()
    navigateToSection(id)
  }

  const handleResourceNav = (id: string, guideId: string) => {
    if (!pinned) closeSidebar()
    navigateToSection(id, { search: { guide: guideId } })
  }

  const handleSelectGuide = (guideId: string) => {
    setShowSettings(false)
    setActiveGuideId(prev => prev === guideId ? null : guideId)
  }

  const handleSettingsClick = () => {
    if (showSettings) {
      setShowSettings(false)
    } else {
      setShowSettings(true)
      setActiveGuideId(null)
    }
  }

  // When pinned, closing the content panel collapses to icon rail (stays pinned).
  // When not pinned, closing the content panel closes the entire sidebar.
  const handleContentPanelClose = () => {
    if (pinned) {
      setActiveGuideId(null)
      setShowSettings(false)
    } else {
      closeSidebar()
    }
  }

  return (
    <nav
      aria-label="Site navigation"
      data-testid="sidebar"
      className={clsx(
        'sidebar fixed top-0 left-0 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-100 flex flex-row transition-[width,translate] duration-250',
        hasExpandedPanel ? 'w-[360px] max-sm:w-[320px]' : 'w-[52px]',
        sidebarVisible ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <IconRail
        activeGuideId={activeGuideId}
        showSettings={showSettings}
        onSelectGuide={handleSelectGuide}
        onHomeClick={handleGuidesHome}
        onResourceClick={handleResourceClick}
        onSettingsClick={handleSettingsClick}
        currentId={currentId}
      />

      {activeGuide && !showSettings && (
        <ContentPanel
          guide={activeGuide}
          currentId={currentId}
          onNav={handleNav}
          onResourceNav={handleResourceNav}
          pinned={pinned}
          onTogglePin={togglePin}
          onClose={handleContentPanelClose}
        />
      )}

      {showSettings && (
        <SettingsPanel
          pinned={pinned}
          onTogglePin={togglePin}
          onClose={handleContentPanelClose}
          onNav={handleNav}
        />
      )}
    </nav>
  )
}
