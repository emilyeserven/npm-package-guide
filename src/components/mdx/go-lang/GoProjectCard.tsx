import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { GO_STARTER_PROJECTS } from '../../../data/goLangData'
import { CopyButton } from '../CopyButton'

export function GoProjectCard({ index }: { index: number }) {
  const isDark = useIsDark()
  const project = GO_STARTER_PROJECTS[index]
  if (!project) return null

  const borderColor = ds('#e2e8f0', '#334155', isDark)
  const mutedColor = ds('#64748b', '#64748b', isDark)
  const diffColors: Record<string, { bg: string; darkBg: string; text: string; darkText: string }> = {
    beginner: { bg: 'rgba(34,197,94,0.1)', darkBg: 'rgba(34,197,94,0.12)', text: '#16a34a', darkText: '#4ade80' },
    intermediate: { bg: 'rgba(245,158,11,0.1)', darkBg: 'rgba(245,158,11,0.12)', text: '#d97706', darkText: '#fbbf24' },
  }
  const dc = diffColors[project.difficulty] ?? diffColors.beginner

  return (
    <div
      className="rounded-xl border p-6 mb-4"
      style={{
        background: ds('#ffffff', '#1e293b', isDark),
        borderColor,
      }}
    >
      <h4
        className="text-lg font-bold mb-1"
        style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
      >
        {project.title}
      </h4>
      <div className="flex items-center gap-3 text-xs mb-3" style={{ color: mutedColor }}>
        <span
          className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] tracking-wide"
          style={{
            background: ds(dc.bg, dc.darkBg, isDark),
            color: ds(dc.text, dc.darkText, isDark),
          }}
        >
          {project.difficulty}
        </span>
        <span>{project.time}</span>
        <span>{project.concepts}</span>
      </div>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: ds('#475569', '#94a3b8', isDark) }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold"
            style={{
              background: ds('rgba(8,145,178,0.08)', 'rgba(34,211,238,0.1)', isDark),
              color: ds('#0891b2', '#22d3ee', isDark),
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Steps */}
      <div className="relative pl-7">
        <div
          className="absolute left-2 top-2 bottom-2 w-0.5"
          style={{ background: borderColor }}
        />
        {project.steps.map((step, i) => (
          <div key={i} className="relative py-2">
            <div
              className="absolute -left-5 top-3 w-2.5 h-2.5 rounded-full border-2"
              style={{
                borderColor: ds('#0891b2', '#22d3ee', isDark),
                background: ds('#ffffff', '#0f172a', isDark),
              }}
            />
            <div
              className="text-sm font-semibold"
              style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
            >
              {step.label}
            </div>
            <div className="text-xs" style={{ color: mutedColor }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Code example */}
      {project.code && (
        <div className="relative mt-4 rounded-lg border overflow-hidden" style={{ borderColor }}>
          <div
            className="flex items-center justify-between px-4 py-2 border-b text-xs font-semibold"
            style={{
              background: ds('#f1f5f9', '#151b23', isDark),
              borderColor,
              color: ds('#475569', '#94a3b8', isDark),
            }}
          >
            <span>main.go</span>
            <CopyButton
              text={project.code}
              className="px-2 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer"
            />
          </div>
          <pre
            className="p-4 m-0 overflow-x-auto text-xs leading-relaxed font-mono"
            style={{
              background: ds('#f8fafc', '#0d1117', isDark),
              color: ds('#334155', '#c9d1d9', isDark),
            }}
          >
            {project.code}
          </pre>
        </div>
      )}
    </div>
  )
}
