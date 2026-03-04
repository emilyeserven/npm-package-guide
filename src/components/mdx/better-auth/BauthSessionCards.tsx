import { useIsDark } from '../../../hooks/useTheme'
import { BAUTH_SESSION_STRATEGIES } from '../../../data/betterAuthData'

export function BauthSessionCards() {
  const isDark = useIsDark()

  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {BAUTH_SESSION_STRATEGIES.map(s => (
        <div
          key={s.label}
          className="rounded-lg border p-3.5"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            borderColor: `${s.color}33`,
          }}
        >
          <div
            className="text-sm font-semibold font-mono mb-1"
            style={{ color: s.color }}
          >
            {s.label}
          </div>
          <div
            className="text-xs leading-relaxed"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            {s.desc}
          </div>
        </div>
      ))}
    </div>
  )
}
