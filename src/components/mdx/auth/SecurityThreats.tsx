import { useIsDark } from '../../../hooks/useTheme'
import { SECURITY_THREATS } from '../../../data/authData'
import type { ThreatSeverity } from '../../../data/authData'
import { StatusBadge } from '../StatusBadge'
import { CardBase } from '../CardBase'

const severityColors: Record<ThreatSeverity, { bg: string; darkBg: string; text: string; darkText: string; border: string; darkBorder: string }> = {
  critical: { bg: '#fef2f2', darkBg: '#991b1b22', text: '#991b1b', darkText: '#fca5a5', border: '#fca5a5', darkBorder: '#991b1b' },
  high:     { bg: '#fff7ed', darkBg: '#9a341222', text: '#9a3412', darkText: '#fdba74', border: '#fdba74', darkBorder: '#9a3412' },
  medium:   { bg: '#fefce8', darkBg: '#854d0e22', text: '#854d0e', darkText: '#fde047', border: '#fde047', darkBorder: '#854d0e' },
}

export function SecurityThreats() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-3 mb-7">
      {SECURITY_THREATS.map((t, i) => (
        <CardBase key={i}>
          <div className="flex justify-between items-center mb-2.5">
            <h4
              className="text-sm font-semibold m-0"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              {t.name}
            </h4>
            <StatusBadge label={t.severity} colors={severityColors[t.severity]} />
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
        </CardBase>
      ))}
    </div>
  )
}
