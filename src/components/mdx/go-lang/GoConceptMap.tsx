import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { GO_CONCEPT_MAP } from '../../../data/goLangData'

export function GoConceptMap() {
  const isDark = useIsDark()

  const headerColor = ds('#64748b', '#64748b', isDark)
  const borderColor = ds('#e2e8f0', '#334155', isDark)
  const cellColor = ds('#475569', '#94a3b8', isDark)
  const rowHover = ds('rgba(0,0,0,0.02)', 'rgba(255,255,255,0.02)', isDark)

  return (
    <div className="overflow-x-auto my-5 rounded-xl border" style={{ borderColor }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${borderColor}` }}>
            <th
              className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider font-mono"
              style={{ color: headerColor }}
            >
              TypeScript
            </th>
            <th
              className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider font-mono"
              style={{ color: headerColor }}
            >
              Go Equivalent
            </th>
          </tr>
        </thead>
        <tbody>
          {GO_CONCEPT_MAP.map((row, i) => (
            <tr
              key={i}
              className="transition-colors"
              style={{ borderBottom: `1px solid ${borderColor}` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = rowHover }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
            >
              <td
                className="px-4 py-3 font-medium"
                style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
                dangerouslySetInnerHTML={{ __html: row.ts }}
              />
              <td
                className="px-4 py-3"
                style={{ color: cellColor }}
                dangerouslySetInnerHTML={{ __html: row.go }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
