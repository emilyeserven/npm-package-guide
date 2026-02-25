import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { JCS_TRANSFORM_PATTERNS } from '../../../data/jscodeshiftData'
import type { JcsTransformPattern } from '../../../data/jscodeshiftData'
import { CopyButton } from '../CopyButton'

/** Side-by-side transform playground showing transform code + before/after. */
export function JcsPlayground({ patternId }: { patternId: string }) {
  const isDark = useIsDark()
  const pattern: JcsTransformPattern | undefined = JCS_TRANSFORM_PATTERNS.find(p => p.id === patternId)

  if (!pattern) return null

  return (
    <div
      className="rounded-xl border overflow-hidden my-6"
      style={{
        background: ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-5 py-3 border-b"
        style={{ borderColor: ds('#e2e8f0', '#334155', isDark) }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs font-medium"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {pattern.title}
          </span>
          <span
            className="inline-block font-mono text-[10px] px-2 py-0.5 rounded"
            style={{
              background: `${ds(pattern.difficultyColor, pattern.difficultyDarkColor, isDark)}18`,
              color: ds(pattern.difficultyColor, pattern.difficultyDarkColor, isDark),
            }}
          >
            {pattern.difficulty}
          </span>
        </div>
        <CopyButton text={pattern.transform} className="px-2 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer" />
      </div>
      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="p-5 md:border-r"
          style={{ borderColor: ds('#e2e8f0', '#334155', isDark) }}
        >
          <span
            className="block font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: ds('#94a3b8', '#64748b', isDark) }}
          >
            Transform
          </span>
          <pre
            className="font-mono text-xs leading-relaxed whitespace-pre-wrap m-0"
            style={{ color: ds('#334155', '#cbd5e1', isDark) }}
          >
            {pattern.transform}
          </pre>
        </div>
        <div className="p-5">
          <span
            className="block font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: ds('#94a3b8', '#64748b', isDark) }}
          >
            Before &rarr; After
          </span>
          <div className="flex flex-col gap-4">
            <div>
              <span
                className="block font-mono text-[10px] mb-1.5"
                style={{ color: ds('#94a3b8', '#64748b', isDark) }}
              >
                // Before
              </span>
              <pre
                className="font-mono text-xs leading-relaxed whitespace-pre-wrap m-0 rounded-lg border p-3"
                style={{
                  background: ds('#fff1f2', 'rgba(248,113,113,0.04)', isDark),
                  borderColor: ds('#fecdd3', 'rgba(248,113,113,0.12)', isDark),
                  color: ds('#334155', '#cbd5e1', isDark),
                }}
              >
                {pattern.before}
              </pre>
            </div>
            <div>
              <span
                className="block font-mono text-[10px] mb-1.5"
                style={{ color: ds('#94a3b8', '#64748b', isDark) }}
              >
                // After
              </span>
              <pre
                className="font-mono text-xs leading-relaxed whitespace-pre-wrap m-0 rounded-lg border p-3"
                style={{
                  background: ds('#f0fdf4', 'rgba(52,211,153,0.04)', isDark),
                  borderColor: ds('#bbf7d0', 'rgba(52,211,153,0.12)', isDark),
                  color: ds('#334155', '#cbd5e1', isDark),
                }}
              >
                {pattern.after}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
