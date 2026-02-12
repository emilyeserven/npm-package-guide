import { useState } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { contentPages } from '../content/registry'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { OptionsDropdown } from './OptionsDropdown'

interface SidebarProps {
  open: boolean
  onClose: () => void
  pinned: boolean
  onTogglePin: () => void
}

// ── Guide data structure ──────────────────────────────────────────────

interface GuideSection { label: string | null; ids: string[] }
interface GuideDefinition { id: string; icon: string; title: string; sections: GuideSection[] }

const buildingPackageOrder = [
  'bigpicture', 'monorepo', 'npm-vs-pnpm',
  'build', 'tsconfig', 'deps', 'dist',
  'packagejson', 'typescript', 'versioning', 'workflow',
]

const ciOrder = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const bonusOrder = ['storybook']

const archStackOrder = [
  'arch-stack-mern', 'arch-stack-pfrn', 'arch-stack-mean',
  'arch-stack-lamp', 'arch-stack-django', 'arch-stack-rails',
]

const archFrameworkOrder = [
  'arch-fw-nextjs', 'arch-fw-react-router', 'arch-fw-tanstack-start', 'arch-fw-remix',
]

const testingFundamentals = [
  'test-overview', 'test-unit', 'test-component', 'test-e2e',
]

const testingPractices = [
  'test-comparison', 'test-best-practices',
]

const testingTools = [
  'test-review-checklist', 'test-tools',
]

const promptMistakesOrder = [
  'prompt-mistakes-logic', 'prompt-mistakes-apis', 'prompt-mistakes-structural', 'prompt-mistakes-style',
]

const promptCtxOrder = [
  'prompt-ctx-system-prompt', 'prompt-ctx-claude-md', 'prompt-ctx-chaining',
  'prompt-ctx-few-shot', 'prompt-ctx-window', 'prompt-ctx-thinking',
]

const guides: GuideDefinition[] = [
  {
    id: 'npm-package',
    icon: '\u{1F4E6}',        // 📦
    title: 'Web App vs. NPM Package',
    sections: [
      { label: null, ids: ['roadmap'] },
      { label: 'Building a Package', ids: buildingPackageOrder },
      { label: 'CI Pipeline & Checks', ids: ciOrder },
      { label: 'Developer Experience', ids: bonusOrder },
      { label: 'Learning Resources', ids: ['checklist'] },
    ],
  },
  {
    id: 'architecture',
    icon: '\u{1F3D7}\uFE0F',  // 🏗️
    title: 'Architecture Guide',
    sections: [
      { label: null, ids: ['arch-start', 'arch-what-is-a-stack'] },
      { label: 'Stack Alternatives', ids: archStackOrder },
      { label: 'Full-Stack Frameworks', ids: ['arch-frameworks-intro', ...archFrameworkOrder] },
      { label: 'Putting It Together', ids: ['arch-how-it-connects'] },
    ],
  },
  {
    id: 'testing',
    icon: '\u{1F9EA}',        // 🧪
    title: 'Testing Guide',
    sections: [
      { label: null, ids: ['test-start'] },
      { label: 'Testing Fundamentals', ids: testingFundamentals },
      { label: 'Comparing Tests', ids: testingPractices },
      { label: 'Checklists & Tools', ids: testingTools },
    ],
  },
  {
    id: 'prompt-engineering',
    icon: '\u{1F9E0}',        // 🧠
    title: 'Prompt Engineering',
    sections: [
      { label: null, ids: ['prompt-start'] },
      { label: 'Common AI Mistakes', ids: [...promptMistakesOrder, 'prompt-testing'] },
      { label: 'Context Management', ids: [...promptCtxOrder, 'prompt-claudemd-checklist'] },
      { label: 'Tooling & Reference', ids: ['prompt-cli-reference', 'prompt-tools-advanced', 'prompt-meta-tooling'] },
    ],
  },
]

const allGuidePageIds = new Map<string, string>()
for (const guide of guides) {
  for (const section of guide.sections) {
    for (const id of section.ids) {
      allGuidePageIds.set(id, guide.id)
    }
  }
}
// Legacy route: #/architecture renders ArchStartPage
allGuidePageIds.set('architecture', 'architecture')

function findGuideForPage(pageId: string): GuideDefinition | undefined {
  const guideId = allGuidePageIds.get(pageId)
  return guideId ? guides.find(g => g.id === guideId) : undefined
}

// ── Title resolution (special pages aren't in contentPages) ───────────

const titleOverrides: Record<string, string> = {
  'roadmap': 'Start Here \u{1F680}',
  'arch-start': 'Start Here \u{1F3D7}\uFE0F',
  'test-start': 'Start Here \u{1F9EA}',
  'prompt-start': 'Start Here \u{1F9E0}',
  'checklist': 'Publish Checklist \u2705',
  'external-resources': 'External Resources \u{1F4DA}',
  'glossary': 'Glossary \u{1F4D6}',
}

function resolveItems(ids: string[]) {
  return ids
    .map(id => {
      if (titleOverrides[id]) return { id, title: titleOverrides[id] }
      const page = contentPages.get(id)
      return page ? { id: page.id, title: page.title } : null
    })
    .filter((item): item is { id: string; title: string } => item !== null)
}

// ── Sub-components ────────────────────────────────────────────────────

// Severity badge colors for Common AI Mistakes sidebar items
const severityBadges: Record<string, { letter: string; cls: string }> = {
  'prompt-mistakes-logic': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-apis': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-structural': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-style': { letter: 'L', cls: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' },
}

function SidebarItem({ id, title, active, onClick }: { id: string; title: string; active: boolean; onClick: (id: string) => void }) {
  const match = title.match(/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u)
  const text = match ? match[1] : title
  const icon = match ? match[2] : ''
  const badge = severityBadges[id]
  return (
    <button
      className={clsx(
        'flex items-center justify-between w-full text-left px-3.5 py-2 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
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
  onSelectGuide,
  onHomeClick,
  onResourceClick,
  currentId,
}: {
  activeGuideId: string | null
  onSelectGuide: (guideId: string) => void
  onHomeClick: () => void
  onResourceClick: (id: string) => void
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

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5" />

      {/* Settings */}
      <div className="relative">
        <OptionsDropdown position="sidebar" />
      </div>
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
  onClose,
  pinned,
  onTogglePin,
}: {
  guide: GuideDefinition | null
  currentId: string
  onNav: (id: string) => void
  onClose: () => void
  pinned: boolean
  onTogglePin: () => void
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-13 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {guide ? guide.title : 'Navigation'}
        </span>
        <div className="flex items-center gap-1">
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 bg-transparent border-none cursor-pointer rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
            onClick={onTogglePin}
            title={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
            data-testid="sidebar-pin"
          >
            <PinIcon pinned={pinned} />
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 bg-transparent border-none cursor-pointer text-lg text-gray-400 dark:text-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
            onClick={onClose}
            data-testid="sidebar-close"
          >
            &#x2715;
          </button>
        </div>
      </div>

      {/* Navigation links */}
      {guide ? (
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
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <span className="text-sm text-slate-400 dark:text-slate-500">Select a guide</span>
        </div>
      )}
    </div>
  )
}

// ── Main Sidebar ──────────────────────────────────────────────────────

export function Sidebar({ open, onClose, pinned, onTogglePin }: SidebarProps) {
  const navigateToSection = useNavigateToSection()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const currentId = params.sectionId || ''

  const [activeGuideId, setActiveGuideId] = useState<string | null>(() => {
    return findGuideForPage(currentId)?.id ?? null
  })

  // Re-sync active guide when sidebar transitions from closed to open
  const [prevOpen, setPrevOpen] = useState(false)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      const expected = findGuideForPage(currentId)?.id ?? null
      if (expected !== activeGuideId) {
        setActiveGuideId(expected)
      }
    }
  }

  const activeGuide = guides.find(g => g.id === activeGuideId) ?? null

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
    onClose()
    navigateToSection(id)
  }

  return (
    <div
      data-testid="sidebar"
      className={clsx(
        'sidebar fixed top-0 left-0 bottom-0 w-[360px] max-sm:w-[320px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-100 flex flex-row transition-transform duration-250 -translate-x-full',
        open && 'translate-x-0'
      )}
    >
      <IconRail
        activeGuideId={activeGuideId}
        onSelectGuide={setActiveGuideId}
        onHomeClick={handleGuidesHome}
        onResourceClick={handleResourceClick}
        currentId={currentId}
      />
      <ContentPanel
        guide={activeGuide}
        currentId={currentId}
        onNav={handleNav}
        onClose={onClose}
        pinned={pinned}
        onTogglePin={onTogglePin}
      />
    </div>
  )
}
