import React, { useState } from 'react'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'
import { theme, tc } from '../../helpers/themeColors'
import type { YamlLine } from '../../data/sharedDataTypes'

interface YamlExplorerBaseProps {
  lines: YamlLine[]
  fileName?: string
}

export function YamlExplorerBase({ lines, fileName }: YamlExplorerBaseProps) {
  const isDark = useIsDark()
  const [activeLine, setActiveLine] = useState<number | null>(null)

  return (
    <div className="flex gap-4 flex-wrap my-6">
      {/* YAML panel */}
      <div className="flex-1 basis-96 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
        {fileName && (
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {fileName}
          </div>
        )}
        <div className="py-3 font-mono text-xs leading-7 overflow-x-auto">
          {lines.map((item, i) => {
            const isClickable = !!item.note
            const isActive = activeLine === i
            return (
              <div
                key={i}
                onClick={isClickable ? () => setActiveLine(isActive ? null : i) : undefined}
                onKeyDown={isClickable ? (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveLine(isActive ? null : i)
                  }
                } : undefined}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-pressed={isClickable ? isActive : undefined}
                className="px-4 transition-all duration-150 whitespace-pre"
                style={{
                  cursor: isClickable ? 'pointer' : 'default',
                  background: isActive
                    ? ds('#f1f5f9', '#334155', isDark)
                    : 'transparent',
                  borderLeft: isActive
                    ? `2px solid ${ds('#6366f1', '#818cf8', isDark)}`
                    : '2px solid transparent',
                  color: item.line === ''
                    ? 'transparent'
                    : item.line.startsWith('  ')
                      ? ds('#7c3aed', '#c4b5fd', isDark)
                      : tc(theme.textSecondary, isDark),
                }}
              >
                {item.line || '\u00A0'}
              </div>
            )
          })}
        </div>
      </div>

      {/* Explanation panel */}
      <div className="flex-1 basis-60 min-w-60">
        {activeLine !== null && lines[activeLine]?.note ? (
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
              {lines[activeLine].line.trim()}
            </code>
            <p className="m-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {lines[activeLine].note}
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
