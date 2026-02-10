import { useNavigate } from '@tanstack/react-router'
import { getNavOrder, getNavTitle } from '../data/navigation'

export function PrevNextNav({ currentId }: { currentId: string }) {
  const navigate = useNavigate()
  const order = getNavOrder()
  const idx = order.indexOf(currentId)

  const handleNav = (id: string) => {
    if (id === 'roadmap') {
      navigate({ to: '/' })
    } else {
      navigate({ to: '/$sectionId', params: { sectionId: id } })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="section-nav">
      {idx > 0 && (
        <button className="section-nav-btn prev" onClick={() => handleNav(order[idx - 1])}>
          <span className="nav-arrow">&larr;</span>
          <span className="nav-label">{getNavTitle(order[idx - 1]).replace(/^\S+\s+/, '')}</span>
        </button>
      )}
      {idx < order.length - 1 && (
        <button className="section-nav-btn next" onClick={() => handleNav(order[idx + 1])}>
          <span className="nav-label">{getNavTitle(order[idx + 1]).replace(/^\S+\s+/, '')}</span>
          <span className="nav-arrow">&rarr;</span>
        </button>
      )}
    </div>
  )
}
