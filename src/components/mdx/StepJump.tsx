import { useNavigateToSection } from '../../hooks/useNavigateToSection'

export function StepJump({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigateToSection()
  return (
    <button className="step-jump" onClick={() => navigate(to)}>
      {children}
    </button>
  )
}
