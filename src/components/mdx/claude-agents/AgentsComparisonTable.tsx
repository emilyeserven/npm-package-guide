import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { SKILL_VS_AGENT_ROWS } from '../../../data/agentsData'

export function AgentsComparisonTable() {
  const isDark = useIsDark()

  return (
    <div className="overflow-x-auto mt-4 mb-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ borderBottom: `2px solid ${tc(theme.borderDefault, isDark)}` }}>
            <th
              className="text-left py-3 px-4 font-medium"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              Feature
            </th>
            <th
              className="text-left py-3 px-4 font-semibold"
              style={{ color: ds('#92400e', '#fbbf24', isDark) }}
            >
              Skills
            </th>
            <th
              className="text-left py-3 px-4 font-semibold"
              style={{ color: ds('#3730a3', '#818cf8', isDark) }}
            >
              Agents
            </th>
          </tr>
        </thead>
        <tbody>
          {SKILL_VS_AGENT_ROWS.map((row, i) => (
            <tr
              key={row.feature}
              style={{
                background: i % 2 === 0
                  ? 'transparent'
                  : ds('#f8fafc', 'rgba(30,41,59,0.4)', isDark),
              }}
            >
              <td
                className="py-3 px-4 font-medium border-b"
                style={{
                  color: tc(theme.textSecondary, isDark),
                  borderColor: ds('#f1f5f9', 'rgba(51,65,85,0.3)', isDark),
                }}
              >
                {row.feature}
              </td>
              <td
                className="py-3 px-4 border-b"
                style={{
                  color: tc(theme.textSecondary, isDark),
                  borderColor: ds('#f1f5f9', 'rgba(51,65,85,0.3)', isDark),
                }}
              >
                {row.skill}
              </td>
              <td
                className="py-3 px-4 border-b"
                style={{
                  color: tc(theme.textSecondary, isDark),
                  borderColor: ds('#f1f5f9', 'rgba(51,65,85,0.3)', isDark),
                }}
              >
                {row.agent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
