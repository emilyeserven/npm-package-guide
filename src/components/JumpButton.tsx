import { useNavigateToSection } from '../hooks/useNavigateToSection'

export const jumpBtnCls = 'inline-flex items-center gap-1.5 text-sm font-bold text-white cursor-pointer bg-blue-500 dark:bg-blue-400 dark:text-slate-900 border-none font-sans py-2 px-3.5 rounded-lg transition-all duration-150 mt-1 shadow-md shadow-blue-500/25 hover:bg-blue-600 dark:hover:bg-blue-500 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/30'

export function JumpButton({ jumpTo, children, style }: { jumpTo: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const navigate = useNavigateToSection()
  return (
    <button className={jumpBtnCls} style={style} onClick={() => navigate(jumpTo)}>
      {children}
    </button>
  )
}
