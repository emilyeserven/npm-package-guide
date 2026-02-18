import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import {
  TSQ_TOOLS_COMPARISON,
  TSQ_ARCHITECTURE_CODE,
} from '../../../data/tanstackQueryData'

export function TsqWhyBoth() {
  const isDark = useIsDark()

  const accent = ds('#d97706', '#f59e0b', isDark)
  const codeBg = ds('#f8fafc', '#0d1117', isDark)
  const headerBg = ds('#e2e8f0', '#1e293b', isDark)

  return (
    <div>
      {/* Misconception callout */}
      <div
        className="rounded-xl p-6 mb-5"
        style={{
          background: ds(
            'linear-gradient(135deg, rgba(217,119,6,0.08), rgba(124,58,237,0.06))',
            'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(139,92,246,0.12))',
            isDark,
          ),
          border: `1px solid ${tc(theme.borderDefault, isDark)}`,
        }}
      >
        <p
          className="text-xl font-semibold m-0 leading-snug"
          style={{ color: tc(theme.textPrimary, isDark) }}
        >
          &ldquo;TanStack Query replaces Redux&rdquo; is one of the most common
          misconceptions in React.
        </p>
        <p
          className="text-sm mt-3 mb-0 leading-relaxed"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          It replaces the <em>server-state management</em> that people{' '}
          <em>used to shove into Redux</em>. The actual client state that
          Redux/Zustand/Context handle &mdash; theme, UI toggles, auth tokens,
          feature flags, wizard step &mdash; still needs a home. TanStack Query
          is not that home.
        </p>
      </div>

      {/* Tool comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {TSQ_TOOLS_COMPARISON.map((item) => {
          const color = ds(item.color[0], item.color[1], isDark)
          return (
            <div
              key={item.tool}
              className="rounded-xl p-5"
              style={{
                background: tc(theme.bgCard, isDark),
                border: `1px solid ${tc(theme.borderDefault, isDark)}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="text-lg font-semibold"
                  style={{ color: tc(theme.textPrimary, isDark) }}
                >
                  {item.tool}
                </span>
                <span
                  className="inline-block rounded-full font-mono text-xs font-semibold"
                  style={{
                    padding: '2px 10px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color,
                    background: `${color}18`,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {item.verdict}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed m-0"
                style={{ color: tc(theme.textSecondary, isDark) }}
              >
                {item.why}
              </p>
            </div>
          )
        })}
      </div>

      {/* Architecture code block */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2 font-mono text-xs"
          style={{ background: headerBg, color: tc(theme.textMuted, isDark) }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: ds('#e11d48', '#f43f5e', isDark), opacity: 0.7 }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: accent, opacity: 0.7 }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: ds('#0d9488', '#14b8a6', isDark), opacity: 0.7 }}
          />
          <span className="ml-2">architecture.jsx &mdash; each tool in its lane</span>
        </div>
        <pre
          className="m-0 overflow-x-auto font-mono"
          style={{
            padding: 16,
            background: codeBg,
            fontSize: 12.5,
            lineHeight: 1.7,
            color: tc(theme.textSecondary, isDark),
          }}
        >
          <code>{TSQ_ARCHITECTURE_CODE}</code>
        </pre>
      </div>
    </div>
  )
}
