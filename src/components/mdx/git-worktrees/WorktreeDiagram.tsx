import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'

const branches = [
  { name: 'main/', label: 'stable code', color: '#22d3ee' },
  { name: 'feature-auth/', label: 'Claude works here', color: '#34d399' },
  { name: 'fix-header/', label: 'you work here', color: '#fbbf24' },
] as const

export function WorktreeDiagram() {
  const isDark = useIsDark()

  return (
    <div
      className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      style={{ background: tc(theme.bgCard, isDark) }}
    >
      <div className="px-6 py-5">
        {/* Root node */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 font-mono text-sm font-semibold border"
            style={{
              background: isDark ? '#1a1e28' : '#f8fafc',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: tc(theme.textPrimary, isDark),
            }}
          >
            {'\u{1F4C1}'} my-project{' '}
            <span className="ml-1.5 opacity-50 font-normal">(bare repo)</span>
          </span>
        </div>

        {/* Connector */}
        <div className="ml-6 mb-1">
          <div
            className="w-0.5 h-4"
            style={{ background: isDark ? '#334155' : '#cbd5e1' }}
          />
        </div>

        {/* Branches */}
        <div className="ml-4 flex flex-col gap-1.5">
          {branches.map((b, i) => (
            <div key={b.name} className="flex items-center gap-3">
              <span
                className="font-mono text-xs select-none shrink-0"
                style={{ color: isDark ? '#475569' : '#94a3b8' }}
              >
                {i === branches.length - 1 ? '\u2514\u2500\u2500' : '\u251C\u2500\u2500'}
              </span>
              <span
                className="inline-flex items-center rounded-md px-2.5 py-1 font-mono text-sm font-semibold border"
                style={{
                  background: `${b.color}${isDark ? '18' : '12'}`,
                  borderColor: `${b.color}${isDark ? '40' : '30'}`,
                  color: b.color,
                }}
              >
                {b.name}
              </span>
              <span
                className="text-xs"
                style={{ color: tc(theme.textMuted, isDark) }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
