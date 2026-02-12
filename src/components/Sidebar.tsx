import { useState } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { contentPages } from '../content/registry'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface SidebarProps {
  open: boolean
  onClose: () => void
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
    id: 'resources',
    icon: '\u{1F4DA}',        // 📚
    title: 'Resources',
    sections: [
      { label: null, ids: ['external-resources', 'glossary'] },
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
  'roadmap': '\u{1F680} Start Here',
  'arch-start': '\u{1F3D7}\uFE0F Start Here',
  'test-start': '\u{1F9EA} Start Here',
  'checklist': '\u2705 Publish Checklist',
  'external-resources': '\u{1F4DA} External Resources',
  'glossary': '\u{1F4D6} Glossary',
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

function SidebarItem({ id, title, active, onClick }: { id: string; title: string; active: boolean; onClick: (id: string) => void }) {
  const match = title.match(/^(\S+)\s+(.+)$/)
  const icon = match ? match[1] : ''
  const text = match ? match[2] : title
  return (
    <button
      className={clsx(
        'flex items-center w-full text-left px-3.5 py-2 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
        active
          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
      )}
      onClick={() => onClick(id)}
      data-testid={`sidebar-item-${id}`}
    >
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      {icon && <span className="ml-2 text-base leading-none opacity-70 shrink-0">{icon}</span>}
    </button>
  )
}

function IconRail({
  activeGuideId,
  onSelectGuide,
  onHomeClick,
  currentId,
}: {
  activeGuideId: string | null
  onSelectGuide: (guideId: string) => void
  onHomeClick: () => void
  currentId: string
}) {
  return (
    <div className="flex flex-col items-center w-[52px] shrink-0 border-r border-slate-200 dark:border-slate-700 py-3 gap-1">
      {/* Home button */}
      <Link
        to="/"
        className={clsx(
          'flex items-center justify-center w-10 h-10 rounded-lg border-none cursor-pointer transition-all duration-150',
          !currentId
            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
            : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        )}
        onClick={onHomeClick}
        title="Home"
        data-testid="sidebar-home-icon"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </Link>

      <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 my-1.5" />

      {/* Guide icons */}
      {guides.map(guide => (
        <button
          key={guide.id}
          className={clsx(
            'flex items-center justify-center w-10 h-10 rounded-lg border-none cursor-pointer transition-all duration-150',
            activeGuideId === guide.id
              ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
              : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
          onClick={() => onSelectGuide(guide.id)}
          title={guide.title}
          data-testid={`sidebar-guide-icon-${guide.id}`}
        >
          <span className="text-lg leading-none">{guide.icon}</span>
        </button>
      ))}
    </div>
  )
}

function ContentPanel({
  guide,
  currentId,
  onNav,
  onClose,
}: {
  guide: GuideDefinition | null
  currentId: string
  onNav: (id: string) => void
  onClose: () => void
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-13 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {guide ? guide.title : 'Navigation'}
        </span>
        <button
          className="flex items-center justify-center w-7 h-7 bg-transparent border-none cursor-pointer text-lg text-gray-400 dark:text-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
          onClick={onClose}
          data-testid="sidebar-close"
        >
          &#x2715;
        </button>
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

export function Sidebar({ open, onClose }: SidebarProps) {
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
    onClose()
    navigateToSection(id)
  }

  const handleGuidesHome = () => {
    onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        currentId={currentId}
      />
      <ContentPanel
        guide={activeGuide}
        currentId={currentId}
        onNav={handleNav}
        onClose={onClose}
      />
    </div>
  )
}
