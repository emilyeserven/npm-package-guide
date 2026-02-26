import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'

const GOOD_FIT = [
  '5+ microservices',
  'Multiple teams/namespaces',
  'Complex scaling needs',
  'Multi-cloud strategy',
  'Existing K8s expertise',
]

const ALTERNATIVES = [
  '1\u20132 services (use ECS or Lambda)',
  'Small team, simple app',
  'Budget-constrained MVP',
  'No container experience',
  'Static sites (use S3+CloudFront)',
]

export function EksWhenToUse() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <div
        className="rounded-xl border p-4"
        style={{
          background: isDark ? 'rgba(6,214,160,0.05)' : 'rgba(4,120,87,0.03)',
          borderColor: isDark ? 'rgba(6,214,160,0.15)' : 'rgba(4,120,87,0.15)',
        }}
      >
        <div
          className="text-xs font-mono font-semibold mb-2"
          style={{ color: isDark ? '#06D6A0' : '#047857' }}
        >
          {'\u2713'} GOOD FIT
        </div>
        {GOOD_FIT.map((t) => (
          <div
            key={t}
            className="text-sm py-0.5"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {t}
          </div>
        ))}
      </div>
      <div
        className="rounded-xl border p-4"
        style={{
          background: isDark ? 'rgba(239,71,111,0.05)' : 'rgba(190,18,60,0.03)',
          borderColor: isDark ? 'rgba(239,71,111,0.15)' : 'rgba(190,18,60,0.15)',
        }}
      >
        <div
          className="text-xs font-mono font-semibold mb-2"
          style={{ color: isDark ? '#EF476F' : '#be123c' }}
        >
          {'\u2717'} CONSIDER ALTERNATIVES
        </div>
        {ALTERNATIVES.map((t) => (
          <div
            key={t}
            className="text-sm py-0.5"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
