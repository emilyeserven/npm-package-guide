import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { CMD_HIERARCHY_ROWS } from '../../../data/claudeMdData'

export function CmdHierarchyTable() {
  const isDark = useIsDark()

  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {['Type', 'Location', 'Purpose', 'Shared With'].map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2.5 font-semibold border-b-2"
                style={{
                  borderColor: ds('#cbd5e1', '#475569', isDark),
                  color: ds('#3b82f6', '#60a5fa', isDark),
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CMD_HIERARCHY_ROWS.map((row, i) => (
            <tr key={i}>
              <td
                className="px-3 py-2.5 border-b align-top font-semibold whitespace-nowrap"
                style={{
                  borderColor: ds('#e2e8f0', '#334155', isDark),
                  color: ds('#db2777', '#f9a8d4', isDark),
                }}
              >
                {row.type}
              </td>
              <td
                className="px-3 py-2.5 border-b align-top font-mono text-xs whitespace-pre-wrap"
                style={{
                  borderColor: ds('#e2e8f0', '#334155', isDark),
                  color: ds('#475569', '#94a3b8', isDark),
                }}
              >
                {row.location}
              </td>
              <td
                className="px-3 py-2.5 border-b align-top"
                style={{
                  borderColor: ds('#e2e8f0', '#334155', isDark),
                  color: ds('#475569', '#94a3b8', isDark),
                }}
              >
                {row.purpose}
              </td>
              <td
                className="px-3 py-2.5 border-b align-top"
                style={{
                  borderColor: ds('#e2e8f0', '#334155', isDark),
                  color: ds('#475569', '#94a3b8', isDark),
                }}
              >
                {row.sharedWith}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
