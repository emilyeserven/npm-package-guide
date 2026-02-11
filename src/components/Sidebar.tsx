import { useNavigate, useParams } from '@tanstack/react-router'
import clsx from 'clsx'
import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'

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
    >
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      {icon && <span className="ml-2 text-base leading-none opacity-70 shrink-0">{icon}</span>}
    </button>
  )
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const currentId = params.sectionId || 'roadmap'

  const handleNav = (id: string) => {
    onClose()
    if (id === 'roadmap') {
      navigate({ to: '/' })
    } else {
      navigate({ to: '/$sectionId', params: { sectionId: id } })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const topItems = [
    { id: 'roadmap', title: '🚀 Start Here' },
  ]

  // Order matches the Start Page roadmap steps
  const buildingPackageOrder = [
    'bigpicture', 'monorepo', 'npm-vs-pnpm',
    'build', 'tsconfig', 'deps', 'dist',
    'packagejson', 'typescript', 'versioning', 'workflow',
  ]
  const buildingPackageItems = buildingPackageOrder
    .map(id => {
      const s = sections.find(s => s.id === id)
      return s ? { id: s.id, title: s.title } : null
    })
    .filter((item): item is { id: string; title: string } => item !== null)

  const resourceItems = [
    { id: 'checklist', title: '✅ Publish Checklist' },
    { id: 'external-resources', title: '📚 External Resources' },
    { id: 'glossary', title: '📖 Glossary' },
  ]

  return (
    <div className={clsx(
      'sidebar fixed top-0 left-0 bottom-0 w-80 max-sm:w-70 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-100 flex flex-col transition-transform duration-250 -translate-x-full',
      open && 'translate-x-0'
    )}>
      <div className="flex items-center justify-between px-4 h-13 border-b border-slate-200 dark:border-slate-700 shrink-0">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Navigation</span>
        <button
          className="flex items-center justify-center w-7 h-7 bg-transparent border-none cursor-pointer text-lg text-gray-400 dark:text-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150"
          onClick={onClose}
        >
          &#x2715;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
        {topItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-5 mb-1.5 px-3.5">Building a Package: Step by Step</div>
        {buildingPackageItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-5 mb-1.5 px-3.5">Bonus: CI Pipeline &amp; Checks</div>
        {ciPages.map(item => (
          <SidebarItem key={item.id} id={item.id} title={item.title} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-5 mb-1.5 px-3.5">Bonus: Developer Experience</div>
        {bonusSections.map(item => (
          <SidebarItem key={item.id} id={item.id} title={item.title} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-5 mb-1.5 px-3.5">Bonus: Learning Resources</div>
        {resourceItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}
      </div>
    </div>
  )
}
