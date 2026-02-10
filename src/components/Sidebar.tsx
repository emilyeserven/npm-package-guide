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

export function Sidebar({ open: _open, onClose }: SidebarProps) {
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
    { id: 'bigpicture', title: '🗺️ Big Picture' },
  ]

  const conceptItems = sections.filter(s => s.group === 'concepts').map(s => ({ id: s.id, title: s.title }))
  const comparisonItems = sections.filter(s => s.group !== 'concepts' && s.id !== 'bigpicture').map(s => ({ id: s.id, title: s.title }))

  const resourceItems = [
    { id: 'checklist', title: '✅ Publish Checklist' },
    { id: 'overall-resources', title: '📚 Learning Resources' },
    { id: 'section-links', title: '🔗 Section References' },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Navigation</span>
        <button className="sidebar-close" onClick={onClose}>&#x2715;</button>
      </div>
      <div className="sidebar-body">
        {topItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Overall Concepts</div>
        {conceptItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Web App vs NPM Package</div>
        {comparisonItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">CI Pipeline &amp; Checks</div>
        {ciPages.map(item => (
          <SidebarItem key={item.id} id={item.id} title={item.title} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Bonus</div>
        {bonusSections.map(item => (
          <SidebarItem key={item.id} id={item.id} title={item.title} active={currentId === item.id} onClick={handleNav} />
        ))}

        <div className="sidebar-group-label">Resources</div>
        {resourceItems.map(item => (
          <SidebarItem key={item.id} {...item} active={currentId === item.id} onClick={handleNav} />
        ))}
      </div>
    </div>
  )
}
