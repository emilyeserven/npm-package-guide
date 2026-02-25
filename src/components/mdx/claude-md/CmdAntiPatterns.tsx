import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AccordionList } from '../AccordionList'
import { CMD_ANTI_PATTERNS } from '../../../data/claudeMdData'
import type { CmdAntiPattern } from '../../../data/claudeMdData'

export function CmdAntiPatterns() {
  const isDark = useIsDark()

  return (
    <AccordionList<CmdAntiPattern>
      items={CMD_ANTI_PATTERNS}
      renderHeader={(ap) => (
        <span className="font-semibold text-sm" style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}>
          {'\u{1F6AB}'} {ap.name}
        </span>
      )}
      renderBody={(ap) => (
        <div className="flex flex-col gap-2 text-sm leading-relaxed">
          <p className="m-0" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
            <strong style={{ color: ds('#dc2626', '#fca5a5', isDark) }}>Problem:</strong> {ap.problem}
          </p>
          <p className="m-0" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
            <strong style={{ color: ds('#ea580c', '#fdba74', isDark) }}>Consequence:</strong> {ap.consequence}
          </p>
          <p className="m-0" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
            <strong style={{ color: ds('#16a34a', '#86efac', isDark) }}>Fix:</strong> {ap.fix}
          </p>
        </div>
      )}
    />
  )
}
