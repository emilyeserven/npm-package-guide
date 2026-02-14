import { useIsDark } from '../../../hooks/useTheme'
import { AUTH_PATTERNS } from '../../../data/authData'
import { useAccordion } from '../../../hooks/useAccordion'

export function AuthPatterns() {
  const isDark = useIsDark()
  const { toggle, isExpanded } = useAccordion()

  return (
    <div className="flex flex-col gap-3 mb-7">
      {AUTH_PATTERNS.map((p, i) => (
        <div
          key={i}
          className="rounded-xl border overflow-hidden"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center p-5 text-left cursor-pointer border-none"
            style={{ background: 'transparent' }}
          >
            <div>
              <h4
                className="text-sm font-semibold mb-1 mt-0"
                style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              >
                {p.name}
              </h4>
              <p className="text-xs m-0" style={{ color: '#22c55e' }}>
                ✓ {p.recommendation}
              </p>
              <p className="text-xs m-0" style={{ color: '#ef4444' }}>
                ✗ {p.avoid}
              </p>
            </div>
            <span
              className="text-lg transition-transform duration-200"
              style={{
                color: '#6366f1',
                transform: isExpanded(i) ? 'rotate(180deg)' : 'none',
              }}
            >
              ▾
            </span>
          </button>
          {isExpanded(i) && (
            <div
              className="px-5 pb-5 pt-4"
              style={{ borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }}
            >
              <pre
                className="m-0 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
                style={{
                  background: isDark ? '#0f172a' : '#f1f5f9',
                  color: isDark ? '#cbd5e1' : '#475569',
                }}
              >
                {p.code}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
