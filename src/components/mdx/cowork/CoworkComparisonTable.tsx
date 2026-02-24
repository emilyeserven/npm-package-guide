import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { COMPARISON_ROWS } from '../../../data/coworkData'

export function CoworkComparisonTable() {
  const isDark = useIsDark()

  return (
    <div className="overflow-x-auto mt-4 mb-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {['Feature', 'Local Docs', 'Google Drive', 'Media Server'].map((h, i) => (
              <th
                key={h}
                className="py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b"
                style={{
                  textAlign: i === 0 ? 'left' : 'center',
                  color: ds('#94a3b8', '#64748b', isDark),
                  borderColor: ds('#e2e8f0', '#334155', isDark),
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row, i) => (
            <tr
              key={row.feature}
              style={{
                background: i % 2 === 0
                  ? 'transparent'
                  : ds('#f8fafc', 'rgba(30,41,59,0.4)', isDark),
              }}
            >
              <td
                className="py-2.5 px-4 border-b"
                style={{
                  color: ds('#64748b', '#94a3b8', isDark),
                  borderColor: ds('#f1f5f9', 'rgba(51,65,85,0.3)', isDark),
                }}
              >
                {row.feature}
              </td>
              {[row.docs, row.gdrive, row.media].map((val, j) => (
                <td
                  key={j}
                  className="py-2.5 px-4 text-center border-b"
                  style={{
                    borderColor: ds('#f1f5f9', 'rgba(51,65,85,0.3)', isDark),
                  }}
                >
                  <span style={{ color: val ? '#22c55e' : ds('#d4d4d8', '#3f3f46', isDark) }}>
                    {val ? '\u25CF' : '\u25CB'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
