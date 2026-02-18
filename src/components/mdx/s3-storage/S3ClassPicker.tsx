import { useIsDark } from '../../../hooks/useTheme'
import { useExplorer } from '../../../hooks/useExplorer'
import { SCENARIOS } from '../../../data/s3Data'

export function S3ClassPicker() {
  const isDark = useIsDark()
  const { activeId, toggle, active } = useExplorer(SCENARIOS, null)

  const accentColor = isDark ? '#f0a840' : '#d97706'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SCENARIOS.map(s => {
          const isSelected = activeId === s.id
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className="text-left rounded-xl border-2 p-5 cursor-pointer transition-all"
              style={{
                background: isSelected
                  ? `${accentColor}15`
                  : 'transparent',
                borderColor: isSelected
                  ? accentColor
                  : isDark ? '#334155' : '#e2e8f0',
                fontFamily: 'inherit',
              }}
            >
              <span className="text-2xl block mb-2">{s.icon}</span>
              <span
                className="font-medium text-sm block mb-1"
                style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              >
                {s.label}
              </span>
              <span
                className="text-xs"
                style={{ color: isDark ? '#64748b' : '#94a3b8' }}
              >
                {s.description}
              </span>
            </button>
          )
        })}
      </div>

      {active && (
        <div
          className="mt-5 rounded-xl border p-6 animate-in fade-in"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            borderColor: accentColor,
          }}
        >
          <h4
            className="text-lg font-bold mb-2 mt-0"
            style={{ color: accentColor }}
          >
            {active.title}
          </h4>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            {active.body}
          </p>
          <div className="flex flex-wrap gap-2">
            {active.chips.map(chip => (
              <span
                key={chip}
                className="font-mono text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
