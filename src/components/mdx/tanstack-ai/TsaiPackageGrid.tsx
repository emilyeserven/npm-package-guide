import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSAI_PACKAGES, TSAI_INSTALL_EXAMPLES } from '../../../data/tsaiData'
import type { TsaiPackage } from '../../../data/tsaiData'

export function TsaiPackageGrid() {
  const isDark = useIsDark()
  const accent = ds('#f97316', '#fb923c', isDark)
  const codeBg = ds('#f8fafc', '#0d1117', isDark)

  return (
    <div className="mb-6">
      {/* Package grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {TSAI_PACKAGES.map((pkg: TsaiPackage) => (
          <div
            key={pkg.name}
            className="rounded-lg p-4 font-mono transition-all"
            style={{
              background: tc(theme.bgCard, isDark),
              border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            }}
          >
            <div className="text-xs font-bold mb-1" style={{ color: accent }}>
              {pkg.name}
            </div>
            <div
              className="text-[11px] leading-snug"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              {pkg.description}
            </div>
          </div>
        ))}
      </div>

      {/* Install examples */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2 font-mono text-xs"
          style={{
            background: ds('#e2e8f0', '#1e293b', isDark),
            color: tc(theme.textMuted, isDark),
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: '#22c55e', opacity: 0.7 }} />
          <span className="ml-1">terminal</span>
        </div>
        <pre
          className="m-0 overflow-x-auto font-mono"
          style={{
            padding: 16,
            background: codeBg,
            fontSize: 12.5,
            lineHeight: 1.8,
            color: tc(theme.textSecondary, isDark),
          }}
        >
          <code>
            {TSAI_INSTALL_EXAMPLES.map((ex, i) => (
              <span key={i}>
                <span style={{ color: tc(theme.textMuted, isDark) }}>{`# ${ex.label}`}</span>
                {'\n'}
                {ex.cmd}
                {i < TSAI_INSTALL_EXAMPLES.length - 1 ? '\n\n' : ''}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
