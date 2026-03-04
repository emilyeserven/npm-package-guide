import { useIsDark } from '../../../hooks/useTheme'
import { BAUTH_COMPARISON_FEATURES } from '../../../data/betterAuthData'

function CellValue({ val, isDark }: { val: boolean | string; isDark: boolean }) {
  if (val === true) return <span style={{ color: '#22c55e' }}>{'\u2713'}</span>
  if (val === false) return <span style={{ color: isDark ? '#555' : '#cbd5e1' }}>{'\u2717'}</span>
  return (
    <span
      className="text-[11px]"
      style={{ color: isDark ? '#eab308' : '#a16207' }}
    >
      {val}
    </span>
  )
}

export function BauthComparisonTable() {
  const isDark = useIsDark()

  const thStyle: React.CSSProperties = {
    padding: '10px 12px',
    fontWeight: 500,
    borderBottom: `2px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    fontFamily: 'ui-monospace, monospace',
    fontSize: 12,
  }

  const tdStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}`,
    fontSize: 13,
  }

  return (
    <div
      className="overflow-x-auto rounded-xl border my-4"
      style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
    >
      <table className="w-full border-collapse font-mono" style={{ minWidth: 480 }}>
        <thead>
          <tr>
            <th
              style={{ ...thStyle, textAlign: 'left', color: isDark ? '#94a3b8' : '#64748b' }}
            >
              Feature
            </th>
            <th
              style={{ ...thStyle, textAlign: 'center', color: isDark ? '#e879a0' : '#db2777', fontWeight: 600 }}
            >
              BetterAuth
            </th>
            <th
              style={{ ...thStyle, textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b' }}
            >
              Auth.js
            </th>
            <th
              style={{ ...thStyle, textAlign: 'center', color: isDark ? '#94a3b8' : '#64748b' }}
            >
              Clerk
            </th>
          </tr>
        </thead>
        <tbody>
          {BAUTH_COMPARISON_FEATURES.map(f => (
            <tr key={f.name}>
              <td
                style={{ ...tdStyle, color: isDark ? '#e2e8f0' : '#334155' }}
              >
                {f.name}
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <CellValue val={f.betterAuth} isDark={isDark} />
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <CellValue val={f.authjs} isDark={isDark} />
              </td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <CellValue val={f.clerk} isDark={isDark} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
