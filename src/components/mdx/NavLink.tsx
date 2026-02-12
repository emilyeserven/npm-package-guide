import { useNavigateToSection } from '../../hooks/useNavigateToSection'

export function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigateToSection()
  return (
    <button className="inline-nav-link" onClick={() => navigate(to)}>
      {children}
    </button>
  )
}

export function NavPill({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigateToSection()
  return (
    <button className="inline-nav-pill" onClick={() => navigate(to)}>
      {children}
    </button>
  )
}
