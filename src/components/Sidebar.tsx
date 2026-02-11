import { useNavigate, useParams } from '@tanstack/react-router'
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
    <button className={`sidebar-item ${active ? 'active' : ''}`} onClick={() => onClick(id)}>
      <span>{text}</span>
      {icon && <span className="sidebar-icon">{icon}</span>}
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
    { id: 'overall-resources', title: '📚 Learning Resources' },
    { id: 'section-links', title: '🔗 Section References' },
  ]

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">Navigation</span>
        <button className="sidebar-close" onClick={onClose}>&#x2715;</button>
      </div>
      <div className="sidebar-body">
        {topItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Building a Package: Step by Step</div>
        {buildingPackageItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Bonus: CI Pipeline &amp; Checks</div>
        {ciPages.map(item => (
          <SidebarItem key={item.id} id={item.id} title={item.title} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Bonus</div>
        {bonusSections.map(item => (
          <SidebarItem key={item.id} id={item.id} title={item.title} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Bonus: Learning Resources</div>
        {resourceItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}
      </div>
    </div>
  )
}
