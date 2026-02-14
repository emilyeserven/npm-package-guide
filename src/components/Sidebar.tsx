import { useState, useEffect } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { guides, getGuideForPage, checklistsNavDef, type GuideDefinition } from '../data/guideRegistry'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { STORYBOOK_URL } from '../data/navigation'
import { parseTitle } from '../helpers/parseTitle'
import { usePM } from '../hooks/usePMContext'
import { useTheme } from '../hooks/useTheme'
interface SidebarProps {
  open: boolean
  onClose: () => void
  pinned: boolean
  onTogglePin: () => void
  onActiveGuideChange?: (hasGuide: boolean) => void
}

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
      data-testid={`sidebar-item-${id}`}
    >
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      {badge ? (
        <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold shrink-0 ${badge.cls}`}>{badge.letter}</span>
      ) : icon ? (
        <span className="text-base leading-none opacity-70 shrink-0">{icon}</span>
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
  const iconBtnCls = 'flex items-center justify-center w-10 h-10 rounded-lg border-none cursor-pointer transition-all duration-150 group relative'
  const activeCls = 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
  const inactiveCls = 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  const tooltipCls = 'absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-[11px] font-normal text-white dark:text-slate-200 bg-slate-800 dark:bg-slate-600 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 z-50'

  return (
    <div className="flex flex-col items-center w-[52px] shrink-0 border-r border-slate-200 dark:border-slate-700 py-3 gap-1">
      {/* Home button */}
      <Link
        to="/"
        className={clsx(iconBtnCls, !currentId ? activeCls : inactiveCls)}
        onClick={onHomeClick}
        data-testid="sidebar-home-icon"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span className={tooltipCls}>Home</span>
      </Link>

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5" />

      {/* Guide icons */}
      {guides.map(guide => (
        <button
          key={guide.id}
          className={clsx(iconBtnCls, activeGuideId === guide.id ? activeCls : inactiveCls)}
          onClick={() => onSelectGuide(guide.id)}
          data-testid={`sidebar-guide-icon-${guide.id}`}
        >
          <span className="text-lg leading-none">{guide.icon}</span>
          <span className={tooltipCls}>{guide.title}</span>
        </button>
      ))}

      {/* Spacer pushes resource icons + settings to bottom */}
      <div className="mt-auto" />

      {/* Checklists icon */}
      <button
        className={clsx(iconBtnCls, activeGuideId === 'checklists' ? activeCls : inactiveCls)}
        onClick={() => onSelectGuide('checklists')}
        data-testid="sidebar-icon-checklists"
      >
        <span className="text-lg leading-none">{'\u2705'}</span>
        <span className={tooltipCls}>Checklists</span>
      </button>

      {/* Resource icons */}
      <button
        className={clsx(iconBtnCls, currentId === 'external-resources' ? activeCls : inactiveCls)}
        onClick={() => onResourceClick('external-resources')}
        data-testid="sidebar-icon-external-resources"
      >
        <span className="text-lg leading-none">{'\u{1F4DA}'}</span>
        <span className={tooltipCls}>External Resources</span>
      </button>
      <button
        className={clsx(iconBtnCls, currentId === 'glossary' ? activeCls : inactiveCls)}
        onClick={() => onResourceClick('glossary')}
        data-testid="sidebar-icon-glossary"
      >
        <span className="text-lg leading-none">{'\u{1F4D6}'}</span>
        <span className={tooltipCls}>Glossary</span>
      </button>
      <button
        className={clsx(iconBtnCls, inactiveCls)}
        onClick={() => window.open(STORYBOOK_URL, '_blank', 'noopener,noreferrer')}
        data-testid="sidebar-icon-storybook"
      >
        <span className="text-lg leading-none">{'\u{1F3A8}'}</span>
        <span className={tooltipCls}>Storybook</span>
      </button>

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5" />

      {/* Settings */}
      <button
        className={clsx(iconBtnCls, showSettings ? activeCls : inactiveCls)}
        onClick={onSettingsClick}
        aria-label="Settings"
        data-testid="settings-pane-toggle"
      >
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <span className={tooltipCls}>Settings</span>
      </button>
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
  pinned,
  onTogglePin,
  onClose,
}: {
  guide: GuideDefinition
  currentId: string
  onNav: (id: string) => void
  pinned: boolean
  onTogglePin: () => void
  onClose: () => void
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {guide.title}
        </span>
        <div className="flex items-center gap-0.5 shrink-0 ml-2">
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onTogglePin}
            title={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            data-testid="sidebar-pin"
          >
            <PinIcon pinned={pinned} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-lg text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onClose}
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
      </div>
    </div>
  )
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
            title={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            data-testid="sidebar-pin"
          >
            <PinIcon pinned={pinned} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-md cursor-pointer text-lg text-gray-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onClose}
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

// ── Main Sidebar ──────────────────────────────────────────────────────

export function Sidebar({ open, onClose, pinned, onTogglePin, onActiveGuideChange }: SidebarProps) {
  const navigateToSection = useNavigateToSection()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const currentId = params.sectionId || ''

  const [activeGuideId, setActiveGuideId] = useState<string | null>(() => {
    return getGuideForPage(currentId)?.id ?? null
  })
  const [showSettings, setShowSettings] = useState(false)

  // Re-sync active guide when sidebar transitions from closed to open
  const [prevOpen, setPrevOpen] = useState(false)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open && !showSettings) {
      const expected = getGuideForPage(currentId)?.id ?? null
      if (expected !== activeGuideId) {
        setActiveGuideId(expected)
      }
    }
  }

  const activeGuide = activeGuideId === 'checklists'
    ? checklistsNavDef
    : guides.find(g => g.id === activeGuideId) ?? null
  const hasExpandedPanel = activeGuide !== null || showSettings

  // Notify parent when expanded panel state changes (for layout margin adjustments)
  useEffect(() => {
    onActiveGuideChange?.(hasExpandedPanel)
  }, [hasExpandedPanel, onActiveGuideChange])

  const handleNav = (id: string) => {
    if (!pinned) onClose()
    navigateToSection(id)
  }

  const handleGuidesHome = () => {
    if (!pinned) onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResourceClick = (id: string) => {
    setActiveGuideId(null)
    setShowSettings(false)
    if (!pinned) onClose()
    navigateToSection(id)
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
      onClose()
    }
  }

  return (
    <div
      data-testid="sidebar"
      className={clsx(
        'sidebar fixed top-0 left-0 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-100 flex flex-row transition-[width,translate] duration-250',
        hasExpandedPanel ? 'w-[360px] max-sm:w-[320px]' : 'w-[52px]',
        open ? 'translate-x-0' : '-translate-x-full'
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
          pinned={pinned}
          onTogglePin={onTogglePin}
          onClose={handleContentPanelClose}
        />
      )}

      {showSettings && (
        <SettingsPanel
          pinned={pinned}
          onTogglePin={onTogglePin}
          onClose={handleContentPanelClose}
          onNav={handleNav}
        />
      )}
    </div>
  )
}
