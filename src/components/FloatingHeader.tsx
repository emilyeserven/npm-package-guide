import { useNavigate, useParams } from '@tanstack/react-router'
import { getNavTitle } from '../data/navigation'
import { PMDropdown } from './PMDropdown'

interface FloatingHeaderProps {
  scrolled: boolean
  onMenuToggle: () => void
}

export function FloatingHeader({ scrolled, onMenuToggle }: FloatingHeaderProps) {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as { sectionId?: string }
  const sectionId = params.sectionId || 'roadmap'
  const currentTitle = getNavTitle(sectionId)
  const isHome = sectionId === 'roadmap'

  const handleHomeClick = () => {
    navigate({ to: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`floating-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="floating-header-inner">
        <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Open navigation">
          <span className="header-menu-icon"><span></span><span></span><span></span></span>
        </button>
        <span className="header-section-name">{currentTitle}</span>
        <div className="header-pm-switcher">
          {!isHome && (
            <button className="header-home-btn" onClick={handleHomeClick}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Start Here
            </button>
          )}
          <PMDropdown />
        </div>
      </div>
    </div>
  )
}
