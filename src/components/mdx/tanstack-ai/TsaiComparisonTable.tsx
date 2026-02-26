import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSAI_COMPARISON } from '../../../data/tsaiData'
import type { TsaiComparisonRow } from '../../../data/tsaiData'

export function TsaiComparisonTable() {
  const isDark = useIsDark()

  const headerBg = ds('#f1f5f9', '#1e293b', isDark)
  const border = tc(theme.borderDefault, isDark)
  const accent = ds('#f97316', '#fb923c', isDark)
  const green = ds('#16a34a', '#22c55e', isDark)
  const muted = tc(theme.textMuted, isDark)
  const highlightBg = ds('rgba(249,115,22,0.04)', 'rgba(249,115,22,0.06)', isDark)

  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              className="text-left text-xs font-bold uppercase tracking-wide px-4 py-3"
              style={{ background: headerBg, border: `1px solid ${border}`, color: tc(theme.textPrimary, isDark) }}
            >
              Feature
            </th>
            <th
              className="text-left text-xs font-bold uppercase tracking-wide px-4 py-3"
              style={{ background: headerBg, border: `1px solid ${border}`, color: accent }}
            >
              TanStack AI
            </th>
            <th
              className="text-left text-xs font-bold uppercase tracking-wide px-4 py-3"
              style={{ background: headerBg, border: `1px solid ${border}`, color: tc(theme.textPrimary, isDark) }}
            >
              Vercel AI SDK
            </th>
          </tr>
        </thead>
        <tbody>
          {TSAI_COMPARISON.map((row: TsaiComparisonRow) => (
            <tr key={row.feature}>
              <td
                className="px-4 py-2.5"
                style={{ border: `1px solid ${border}`, color: tc(theme.textSecondary, isDark) }}
              >
                {row.feature}
              </td>
              <td
                className="px-4 py-2.5"
                style={{
                  border: `1px solid ${border}`,
                  background: highlightBg,
                  color: row.tanstack.startsWith('\u2713') ? green : tc(theme.textSecondary, isDark),
                  fontWeight: row.tanstack.startsWith('\u2713') ? 600 : 400,
                }}
              >
                {row.tanstack}
              </td>
              <td
                className="px-4 py-2.5"
                style={{
                  border: `1px solid ${border}`,
                  color: row.vercel.startsWith('\u2713') ? green : row.vercel === '\u2014' ? muted : tc(theme.textSecondary, isDark),
                }}
              >
                {row.vercel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
