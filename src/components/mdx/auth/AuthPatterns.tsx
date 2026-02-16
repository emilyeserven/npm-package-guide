import { AUTH_PATTERNS } from '../../../data/authData'
import type { AuthPattern } from '../../../data/authData'
import { AccordionList } from '../AccordionList'

export function AuthPatterns() {
  return (
    <AccordionList<AuthPattern>
      items={AUTH_PATTERNS}
      className="mb-7"
      gap="gap-3"
      itemClassName="rounded-xl border overflow-hidden p-5"
      itemStyle={(_item, isDark) => ({
        background: isDark ? '#1e293b' : '#ffffff',
        borderColor: isDark ? '#334155' : '#e2e8f0',
      })}
      renderHeader={(p, _i, isDark) => (
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
      )}
      renderBody={(p, _i, isDark) => (
        <div
          className="pt-4 -mx-5 px-5"
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
      renderIndicator={(expanded) => (
        <span
          className="text-lg transition-transform duration-200 shrink-0"
          style={{
            color: '#6366f1',
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        >
          ▾
        </span>
      )}
    />
  )
}
