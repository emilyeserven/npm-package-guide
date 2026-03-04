import { useIsDark } from '../../../hooks/useTheme'
import { BAUTH_FEATURE_CARDS } from '../../../data/betterAuthData'

export function BauthFeatureCards() {
  const isDark = useIsDark()

  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {BAUTH_FEATURE_CARDS.map(item => (
        <div
          key={item.label}
          className="rounded-lg border p-3.5"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <div
            className="text-[13px] font-semibold font-mono mb-1"
            style={{ color: isDark ? '#e879a0' : '#db2777' }}
          >
            {item.label}
          </div>
          <div
            className="text-xs leading-relaxed"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            {item.detail}
          </div>
        </div>
      ))}
    </div>
  )
}
