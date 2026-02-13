import { useIsDark } from '../../../hooks/useTheme'
import { OAUTH_FLOW_STEPS } from '../../../data/authData'

export function OAuthFlow() {
  const isDark = useIsDark()

  return (
    <div className="mb-7">
      {OAUTH_FLOW_STEPS.map((f, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline column */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: '#6366f1' }}
            >
              {f.step}
            </div>
            {i < OAUTH_FLOW_STEPS.length - 1 && (
              <div
                className="w-0.5 grow min-h-6"
                style={{ background: isDark ? '#334155' : '#e2e8f0' }}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-5">
            <h4
              className="text-sm font-semibold mb-1 mt-0"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              {f.label}
            </h4>
            <p
              className="text-sm mb-1 mt-0 leading-relaxed"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {f.detail}
            </p>
            <span
              className="text-xs font-mono font-medium"
              style={{ color: '#6366f1' }}
            >
              {f.actor}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
