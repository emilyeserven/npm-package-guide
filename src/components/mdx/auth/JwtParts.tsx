import { useIsDark } from '../../../hooks/useTheme'
import { JWT_PARTS } from '../../../data/authData'

export function JwtParts() {
  const isDark = useIsDark()

  return (
    <div className="mb-7">
      {/* Dot-separated labels */}
      <div className="flex gap-1.5 items-center mb-4 flex-wrap">
        {JWT_PARTS.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="px-3 py-1 rounded-md text-xs font-semibold font-mono text-white"
              style={{ background: p.color }}
            >
              {p.name}
            </span>
            {i < JWT_PARTS.length - 1 && (
              <span
                className="text-lg font-bold"
                style={{ color: isDark ? '#475569' : '#94a3b8' }}
              >
                .
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Part details */}
      <div className="flex flex-col gap-3">
        {JWT_PARTS.map((p, i) => (
          <div
            key={i}
            className="rounded-xl p-5 border"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              borderLeftWidth: '4px',
              borderLeftColor: p.color,
            }}
          >
            <h4
              className="text-sm font-semibold mb-1.5 mt-0"
              style={{ color: p.color }}
            >
              {p.name}
            </h4>
            <p
              className="text-sm mb-2.5 mt-0"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {p.desc}
            </p>
            <pre
              className="m-0 rounded-md p-3 text-xs font-mono overflow-x-auto leading-relaxed"
              style={{
                background: isDark ? '#0f172a' : '#f1f5f9',
                color: isDark ? '#cbd5e1' : '#475569',
              }}
            >
              {p.json}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
