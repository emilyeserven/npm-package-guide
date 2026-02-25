import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AccordionList } from '../AccordionList'
import { CopyButton } from '../CopyButton'
import { CMD_CATEGORIES } from '../../../data/claudeMdData'
import type { CmdCategory } from '../../../data/claudeMdData'

export function CmdCategories() {
  const isDark = useIsDark()

  return (
    <AccordionList<CmdCategory>
      items={CMD_CATEGORIES}
      renderHeader={(cat) => (
        <span className="font-semibold text-sm" style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}>
          {cat.name}
        </span>
      )}
      renderBody={(cat) => (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            {cat.items.map((item, i) => (
              <div key={i} className="flex gap-2 text-sm" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
                <span style={{ color: ds('#16a34a', '#4ade80', isDark) }}>{'\u2192'}</span>
                {item}
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <CopyButton text={cat.example} className="px-2 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer" />
            </div>
            <pre
              className="rounded-lg border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0 whitespace-pre-wrap"
              style={{
                background: ds('#f8fafc', '#0f172a', isDark),
                borderColor: ds('#e2e8f0', '#1e293b', isDark),
                color: ds('#334155', '#cbd5e1', isDark),
              }}
            >
              {cat.example}
            </pre>
          </div>
        </div>
      )}
    />
  )
}
