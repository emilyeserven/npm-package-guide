import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AccordionList } from '../AccordionList'
import { CopyButton } from '../CopyButton'
import { CMD_LAYOUTS } from '../../../data/claudeMdData'
import type { CmdLayout } from '../../../data/claudeMdData'

export function CmdLayouts() {
  const isDark = useIsDark()

  return (
    <AccordionList<CmdLayout>
      items={CMD_LAYOUTS}
      renderHeader={(layout) => (
        <span className="font-semibold text-sm" style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}>
          {layout.name}
        </span>
      )}
      renderBody={(layout) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed m-0" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
            {layout.description}
          </p>
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <CopyButton text={layout.code} className="px-2 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer" />
            </div>
            <pre
              className="rounded-lg border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0 whitespace-pre-wrap"
              style={{
                background: ds('#f8fafc', '#0f172a', isDark),
                borderColor: ds('#e2e8f0', '#1e293b', isDark),
                color: ds('#334155', '#cbd5e1', isDark),
              }}
            >
              {layout.code}
            </pre>
          </div>
        </div>
      )}
    />
  )
}
