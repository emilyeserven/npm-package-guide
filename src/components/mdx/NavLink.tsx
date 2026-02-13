import { useNavigateToSection } from '../../hooks/useNavigateToSection'
import { getNavTitle } from '../../data/navigation'

export function NavLink({ to, children }: { to: string; children?: React.ReactNode }) {
  const navigate = useNavigateToSection()
  const display = children ?? getNavTitle(to)
  return (
    <button className="inline-nav-link font-sans text-[inherit] font-semibold text-blue-500 dark:text-blue-400 bg-transparent border-none p-0 cursor-pointer underline decoration-dotted underline-offset-2 hover:decoration-solid" onClick={() => navigate(to)}>
      {display}
    </button>
  )
}

export function NavPill({ to, children }: { to: string; children?: React.ReactNode }) {
  const navigate = useNavigateToSection()
  const display = children ?? getNavTitle(to)
  return (
    <button className="inline-nav-pill inline-flex items-center font-sans text-sm font-medium text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 py-2 px-3.5 rounded-lg cursor-pointer transition-all duration-150 leading-snug text-left border border-blue-500/20 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-px" onClick={() => navigate(to)}>
      {display}
    </button>
  )
}
