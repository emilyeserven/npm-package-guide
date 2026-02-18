import { COMPARISON_DATA, SM_COLORS } from '../../../data/stateManagementData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

export function StateComparison() {
  const isDark = useIsDark()

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
    >
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: ds('#f8fafc', '#131820', isDark) }}>
            <th
              className="py-3.5 px-4 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              Feature
            </th>
            <th className="py-3.5 px-4 text-center text-sm font-semibold" style={{ color: SM_COLORS.context }}>
              {'\u269B'} Context
            </th>
            <th className="py-3.5 px-4 text-center text-sm font-semibold" style={{ color: SM_COLORS.zst }}>
              {'\u{1F43B}'} Zustand
            </th>
            <th className="py-3.5 px-4 text-center text-sm font-semibold" style={{ color: SM_COLORS.redux }}>
              {'\u{1F52E}'} Redux
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.map((row, i) => (
            <tr
              key={i}
              style={{
                borderTop: `1px solid ${tc(theme.borderDefault, isDark)}`,
                background: i % 2 === 0 ? 'transparent' : ds('#f8fafc50', '#13182050', isDark),
              }}
            >
              <td
                className="py-3 px-4 font-medium"
                style={{ color: tc(theme.textMuted, isDark) }}
              >
                {row.label}
              </td>
              <td className="py-3 px-4 text-center" style={{ color: tc(theme.textSecondary, isDark) }}>
                {row.context}
              </td>
              <td className="py-3 px-4 text-center" style={{ color: tc(theme.textSecondary, isDark) }}>
                {row.zustand}
              </td>
              <td className="py-3 px-4 text-center" style={{ color: tc(theme.textSecondary, isDark) }}>
                {row.redux}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
