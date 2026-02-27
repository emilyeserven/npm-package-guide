import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WEBHOOK_PITFALLS } from '../../../data/webhooksData'

export function WebhookPitfallTable() {
  const isDark = useIsDark()

  return (
    <div className="overflow-x-auto my-4">
      <table
        className="w-full text-sm border-collapse"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        <thead>
          <tr
            style={{
              borderBottom: `2px solid ${ds('#cbd5e1', '#475569', isDark)}`,
            }}
          >
            {['Pitfall', 'What Happens', 'Fix'].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold uppercase tracking-wide px-3 py-2"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WEBHOOK_PITFALLS.map((p) => (
            <tr
              key={p.pitfall}
              className="transition-colors"
              style={{
                borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`,
              }}
            >
              <td
                className="px-3 py-2.5 font-medium"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {p.pitfall}
              </td>
              <td className="px-3 py-2.5">{p.result}</td>
              <td
                className="px-3 py-2.5"
                style={{ color: ds('#16a34a', '#34d399', isDark) }}
              >
                {p.fix}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
