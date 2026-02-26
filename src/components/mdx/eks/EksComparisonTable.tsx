import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_COMPARISON_ROWS } from '../../../data/eksData'

export function EksComparisonTable() {
  const isDark = useIsDark()

  return (
    <div
      className="rounded-xl border overflow-hidden mb-6"
      style={{
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Feature', 'EKS (Managed)', 'Self-Hosted K8s'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                    borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`,
                    color: tc(theme.textMuted, isDark),
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EKS_COMPARISON_ROWS.map((row) => (
              <tr key={row.feature}>
                <td
                  className="px-4 py-2.5 text-sm"
                  style={{
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'}`,
                    color: tc(theme.textSecondary, isDark),
                  }}
                >
                  {row.feature}
                </td>
                <td
                  className="px-4 py-2.5 text-sm font-medium"
                  style={{
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'}`,
                    color: isDark ? '#06D6A0' : '#047857',
                  }}
                >
                  {row.eks}
                </td>
                <td
                  className="px-4 py-2.5 text-sm"
                  style={{
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'}`,
                    color: tc(theme.textMuted, isDark),
                  }}
                >
                  {row.selfHosted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
