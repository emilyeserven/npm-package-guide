import { useState } from 'react'
import { YAML_LINES } from '../../../data/cicdData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function YamlExplorer() {
  const isDark = useIsDark()
  const [activeLine, setActiveLine] = useState<number | null>(null)

  return (
    <div className="flex gap-4 flex-wrap my-6">
      {/* YAML panel */}
      <div className="flex-1 basis-96 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400">
          .github/workflows/ci.yml
        </div>
        <div className="py-3 font-mono text-xs leading-7 overflow-x-auto">
          {YAML_LINES.map((item, i) => (
            <div
              key={i}
              onClick={() => item.note ? setActiveLine(activeLine === i ? null : i) : undefined}
              className="px-4 transition-all duration-150 whitespace-pre"
              style={{
                cursor: item.note ? 'pointer' : 'default',
                background: activeLine === i
                  ? ds('#f1f5f9', '#334155', isDark)
                  : 'transparent',
                borderLeft: activeLine === i
                  ? `2px solid ${ds('#6366f1', '#818cf8', isDark)}`
                  : '2px solid transparent',
                color: item.line === ''
                  ? 'transparent'
                  : item.line.startsWith('  ')
                    ? ds('#7c3aed', '#c4b5fd', isDark)
                    : ds('#1e293b', '#e2e8f0', isDark),
              }}
            >
              {item.line || '\u00A0'}
            </div>
          ))}
        </div>
      </div>

      {/* Explanation panel */}
      <div className="flex-1 basis-60 min-w-60">
        {activeLine !== null && YAML_LINES[activeLine]?.note ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5 sticky top-4">
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-2.5"
              style={{ color: ds('#6366f1', '#818cf8', isDark) }}
            >
              Explanation
            </div>
            <code
              className="text-sm block mb-3 break-all"
              style={{ color: ds('#7c3aed', '#c4b5fd', isDark) }}
            >
              {YAML_LINES[activeLine].line.trim()}
            </code>
            <p className="m-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {YAML_LINES[activeLine].note}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/40 p-5 text-center text-sm text-slate-400 dark:text-slate-500">
            {'\uD83D\uDC46'} Click any line to see what it does
          </div>
        )}
      </div>
    </div>
  )
}
