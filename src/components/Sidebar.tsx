import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { contentPages } from '../content/registry'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

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

const buildingPackageOrder = [
  'bigpicture', 'monorepo', 'npm-vs-pnpm',
  'build', 'tsconfig', 'deps', 'dist',
  'packagejson', 'typescript', 'versioning', 'workflow',
]

const ciOrder = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const bonusOrder = ['storybook']

const allNpmGuideIds = new Set([
  'roadmap',
  ...buildingPackageOrder,
  ...ciOrder,
  ...bonusOrder,
  'architecture',
  'checklist', 'external-resources', 'glossary',
])

function resolveItems(ids: string[]) {
  return ids
    .map(id => {
      const page = contentPages.get(id)
      return page ? { id: page.id, title: page.title } : null
    })
    .filter((item): item is { id: string; title: string } => item !== null)
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const navigateToSection = useNavigateToSection()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const currentId = params.sectionId || ''

  const isInNpmGuide = allNpmGuideIds.has(currentId)
  const [guideExpanded, setGuideExpanded] = useState(isInNpmGuide || !!currentId)

  const handleNav = (id: string) => {
    onClose()
    navigateToSection(id)
  }

  const handleGuidesHome = () => {
    onClose()
    navigate({ to: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const topItems = [
    { id: 'roadmap', title: '\u{1F680} Start Here' },
  ]

  const buildingPackageItems = resolveItems(buildingPackageOrder)
  const ciItems = resolveItems(ciOrder)
  const bonusItems = resolveItems(bonusOrder)

  const resourceItems = [
    { id: 'checklist', title: '\u2705 Publish Checklist' },
    { id: 'external-resources', title: '\u{1F4DA} External Resources' },
    { id: 'glossary', title: '\u{1F4D6} Glossary' },
  ]

  return (
    <div
      data-testid="sidebar"
      className={clsx(
      'sidebar fixed top-0 left-0 bottom-0 w-80 max-sm:w-70 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-100 flex flex-col transition-transform duration-250 -translate-x-full',
      open && 'translate-x-0'
    )}>
      <div className="flex items-center justify-between px-4 h-13 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Navigation</span>
        <button
          className="flex items-center justify-center w-7 h-7 bg-transparent border-none cursor-pointer text-lg text-gray-400 dark:text-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
          onClick={onClose}
          data-testid="sidebar-close"
        >
          &#x2715;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
        {/* Level 1: Guides index */}
        <button
          className={clsx(
            'flex items-center w-full text-left px-3.5 py-2 text-sm rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150',
            !currentId
              ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
          onClick={handleGuidesHome}
          data-testid="sidebar-item-guides-home"
        >
          <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">All Guides</span>
          <span className="ml-2 text-base leading-none opacity-70 shrink-0">{'\u{1F4CB}'}</span>
        </button>

        {/* Level 1: Guide — Web App vs. NPM Package */}
        <button
          className={clsx(
            'flex items-center w-full text-left px-3.5 py-2.5 text-sm font-semibold rounded-lg border-none bg-transparent cursor-pointer transition-all duration-150 mt-3',
            isInNpmGuide
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          )}
          onClick={() => setGuideExpanded(prev => !prev)}
          data-testid="sidebar-guide-npm"
        >
          <span className="mr-2 text-base shrink-0">{'\u{1F4E6}'}</span>
          <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">Web App vs. NPM Package</span>
          <svg
            className={clsx(
              'w-3.5 h-3.5 shrink-0 ml-2 transition-transform duration-200',
              guideExpanded && 'rotate-90'
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Level 2: Guide sections */}
        {guideExpanded && (
          <div className="pl-3 flex flex-col gap-0.5">
            {topItems.map(item => (
              <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
            ))}

            <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-4 mb-1.5 px-3.5">Building a Package</div>
            {buildingPackageItems.map(item => (
              <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
            ))}

            <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-4 mb-1.5 px-3.5">CI Pipeline &amp; Checks</div>
            {ciItems.map(item => (
              <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
            ))}

            <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-4 mb-1.5 px-3.5">Developer Experience</div>
            {bonusItems.map(item => (
              <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
            ))}
            <SidebarItem id="architecture" title={'\u{1F3D7}\uFE0F Architecture Guide'} active={currentId === 'architecture'} onClick={handleNav} />

            <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-4 mb-1.5 px-3.5">Learning Resources</div>
            {resourceItems.map(item => (
              <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
