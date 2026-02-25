import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AccordionList } from '../AccordionList'
import { CMD_PRINCIPLES } from '../../../data/claudeMdData'
import type { CmdPrinciple } from '../../../data/claudeMdData'

export function CmdPrinciples() {
  const isDark = useIsDark()

  return (
    <AccordionList<CmdPrinciple>
      items={CMD_PRINCIPLES}
      renderHeader={(p) => (
        <span className="font-semibold text-sm" style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}>
          {p.name}
        </span>
      )}
      renderBody={(p) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed m-0" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
            {p.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div
              className="p-3 rounded-lg text-sm leading-relaxed"
              style={{
                background: ds('#ecfdf5', '#064e3b22', isDark),
                color: ds('#065f46', '#6ee7b7', isDark),
              }}
            >
              <strong>Do:</strong> {p.do}
            </div>
            <div
              className="p-3 rounded-lg text-sm leading-relaxed"
              style={{
                background: ds('#fff1f2', '#9f122722', isDark),
                color: ds('#9f1239', '#fda4af', isDark),
              }}
            >
              <strong>Don&rsquo;t:</strong> {p.dont}
            </div>
          </div>
        </div>
      )}
    />
  )
}
