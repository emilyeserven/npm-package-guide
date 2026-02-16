import { useIsDark } from '../../../hooks/useTheme'
import { INTEGRATION_SCENARIOS } from '../../../data/authData'
import { useAccordion } from '../../../hooks/useAccordion'

export function IntegrationFlow() {
  const isDark = useIsDark()
  const { toggle, isExpanded } = useAccordion()

  return (
    <div className="flex flex-col gap-3 mb-7">
      {INTEGRATION_SCENARIOS.map((s, i) => (
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
                {s.name}
              </h4>
              <p className="text-xs m-0" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                {s.description}
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
              className="px-5 pb-5 pt-4 flex flex-col gap-4"
              style={{ borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }}
            >
              <div>
                <div
                  className="text-xs font-semibold mb-2 px-2 py-1 rounded inline-block"
                  style={{
                    background: isDark ? '#052e16' : '#f0fdf4',
                    color: '#22c55e',
                  }}
                >
                  Frontend
                </div>
                <pre
                  className="m-0 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
                  style={{
                    background: isDark ? '#0f172a' : '#f1f5f9',
                    color: isDark ? '#cbd5e1' : '#475569',
                  }}
                >
                  {s.frontendCode}
                </pre>
              </div>
              <div>
                <div
                  className="text-xs font-semibold mb-2 px-2 py-1 rounded inline-block"
                  style={{
                    background: isDark ? '#172554' : '#eff6ff',
                    color: '#3b82f6',
                  }}
                >
                  Backend
                </div>
                <pre
                  className="m-0 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
                  style={{
                    background: isDark ? '#0f172a' : '#f1f5f9',
                    color: isDark ? '#cbd5e1' : '#475569',
                  }}
                >
                  {s.backendCode}
                </pre>
              </div>
              <div>
                <div
                  className="text-xs font-semibold mb-2 px-2 py-1 rounded inline-block"
                  style={{
                    background: isDark ? '#3b1764' : '#faf5ff',
                    color: '#a855f7',
                  }}
                >
                  HTTP Headers
                </div>
                <pre
                  className="m-0 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
                  style={{
                    background: isDark ? '#0f172a' : '#f1f5f9',
                    color: isDark ? '#cbd5e1' : '#475569',
                  }}
                >
                  {s.httpHeaders}
                </pre>
              </div>
              <div
                className="rounded-lg p-3.5 border"
                style={{
                  background: isDark ? '#422006' : '#fffbeb',
                  borderColor: isDark ? '#854d0e' : '#fde68a',
                }}
              >
                <p className="text-xs m-0 leading-relaxed" style={{ color: isDark ? '#fcd34d' : '#92400e' }}>
                  <span className="font-semibold">Gotcha: </span>
                  {s.gotcha}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
