import { useParams, useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { OptionsDropdown } from './OptionsDropdown'

interface FloatingHeaderProps {
  scrolled: boolean
  onMenuToggle: () => void
}

const npmGuideIds = new Set([
  'roadmap',
  'bigpicture', 'monorepo', 'npm-vs-pnpm',
  'build', 'tsconfig', 'deps', 'dist',
  'packagejson', 'typescript', 'versioning', 'workflow',
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
  'storybook',
  'checklist', 'external-resources', 'glossary',
])

function getGuideInfo(sectionId: string | undefined) {
  if (!sectionId) return { title: 'Frontend Guides', homeId: null }
  if (npmGuideIds.has(sectionId)) return { title: 'Web App vs. NPM Package Guide', homeId: 'roadmap' }
  if (sectionId === 'architecture') return { title: 'Architecture Guide', homeId: 'architecture' }
  return { title: 'Frontend Guides', homeId: null }
}

export function FloatingHeader({ scrolled, onMenuToggle }: FloatingHeaderProps) {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const isGuidesIndex = !params.sectionId
  const { title: guideTitle, homeId } = getGuideInfo(params.sectionId)
  const showHomeButton = !isGuidesIndex && homeId !== null && homeId !== params.sectionId

  const handleHomeClick = () => {
    navigate({ to: '/$sectionId', params: { sectionId: homeId! } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={clsx(
      'floating-header fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-5 transition-shadow duration-200',
      scrolled && 'shadow-md dark:shadow-lg'
    )}>
      <div className="mx-auto max-w-4xl flex items-center h-13 gap-3.5">
        <button
          className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg cursor-pointer shrink-0 transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:shadow-md hover:shadow-blue-500/10"
          onClick={onMenuToggle}
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
              data-testid="home-button"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Start Here
            </button>
          )}
          <OptionsDropdown />
        </div>
      </div>
    </div>
  )
}
