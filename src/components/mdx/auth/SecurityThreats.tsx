import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SECURITY_THREATS } from '../../../data/authData'
import type { ThreatSeverity } from '../../../data/authData'

const severityColors: Record<ThreatSeverity, { bg: string; darkBg: string; text: string; darkText: string; border: string; darkBorder: string }> = {
  critical: { bg: '#fef2f2', darkBg: '#991b1b22', text: '#991b1b', darkText: '#fca5a5', border: '#fca5a5', darkBorder: '#991b1b' },
  high:     { bg: '#fff7ed', darkBg: '#9a341222', text: '#9a3412', darkText: '#fdba74', border: '#fdba74', darkBorder: '#9a3412' },
  medium:   { bg: '#fefce8', darkBg: '#854d0e22', text: '#854d0e', darkText: '#fde047', border: '#fde047', darkBorder: '#854d0e' },
}

function SeverityBadge({ level, isDark }: { level: ThreatSeverity; isDark: boolean }) {
  const c = severityColors[level]
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
      style={{
        background: ds(c.bg, c.darkBg, isDark),
        color: ds(c.text, c.darkText, isDark),
        border: `1px solid ${ds(c.border, c.darkBorder, isDark)}`,
      }}
    >
      {level}
    </span>
  )
}

export function SecurityThreats() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-3 mb-7">
      {SECURITY_THREATS.map((t, i) => (
        <div
          key={i}
          className="rounded-xl border p-5"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <div className="flex justify-between items-center mb-2.5">
            <h4
              className="text-sm font-semibold m-0"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              {t.name}
            </h4>
            <SeverityBadge level={t.severity} isDark={isDark} />
          </div>
          <div className="text-sm leading-relaxed">
            <p className="mb-1.5 mt-0">
              <span className="font-semibold" style={{ color: '#ef4444' }}>Risk: </span>
              <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{t.risk}</span>
            </p>
            <p className="mb-0 mt-0">
              <span className="font-semibold" style={{ color: '#22c55e' }}>Defense: </span>
              <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{t.defense}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
