import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function NginxEventLoopDiagram() {
  const isDark = useIsDark()

  const accent = ds('#059669', '#34d399', isDark)
  const accentMuted = ds('#059669', '#34d399', isDark) + (isDark ? '40' : '30')
  const accentBg = ds('rgba(5,150,105,0.08)', 'rgba(52,211,153,0.08)', isDark)
  const textMuted = ds('#64748b', '#94a3b8', isDark)
  const stroke = ds('#e2e8f0', '#334155', isDark)

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6 my-6 overflow-x-auto">
      <svg viewBox="0 0 700 260" className="w-full max-w-[700px]">
        <defs>
          <marker id="nginx-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={accent} />
          </marker>
        </defs>

        {/* Master Process */}
        <rect x="20" y="20" width="140" height="50" rx="8" fill={accentBg} stroke={accent} strokeWidth="1" />
        <text x="90" y="42" textAnchor="middle" fill={accent} fontSize="11" fontFamily="monospace">Master Process</text>
        <text x="90" y="58" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">PID 1 · reads config</text>

        {/* Workers */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1="160" y1="45" x2="220" y2={80 + i * 75} stroke={accent} strokeWidth="1" markerEnd="url(#nginx-arrow)" opacity="0.5" />
            <rect x="220" y={55 + i * 75} width="170" height="50" rx="8" fill={accentBg} stroke={accentMuted} strokeWidth="1" />
            <text x="305" y={77 + i * 75} textAnchor="middle" fill={accent} fontSize="11" fontFamily="monospace">Worker {i + 1}</text>
            <text x="305" y={93 + i * 75} textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">event loop · async I/O</text>

            {/* Connections */}
            {[0, 1, 2, 3].map((j) => (
              <g key={j}>
                <line x1="390" y1={80 + i * 75} x2="440" y2={60 + i * 75 + j * 16} stroke={accentMuted} strokeWidth="1" />
                <circle cx="445" cy={60 + i * 75 + j * 16} r="4" fill={accentMuted} />
              </g>
            ))}
          </g>
        ))}

        {/* Label */}
        <text x="480" y="80" fill={textMuted} fontSize="9" fontFamily="monospace">connections</text>
        <text x="480" y="94" fill={textMuted} fontSize="9" fontFamily="monospace">(1000s each)</text>

        {/* Client cloud */}
        <rect x="550" y="50" width="130" height="160" rx="12" fill={accentBg} stroke={stroke} strokeWidth="1" strokeDasharray="4" />
        <text x="615" y="135" textAnchor="middle" fill={textMuted} fontSize="10" fontFamily="monospace">Clients</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <circle key={i} cx={570 + (i % 3) * 28} cy={78 + Math.floor(i / 3) * 28} r="6" fill={accentBg} stroke={accentMuted} strokeWidth="0.5" />
        ))}

        <line x1="455" y1="130" x2="545" y2="130" stroke={accentMuted} strokeWidth="1" markerEnd="url(#nginx-arrow)" />
      </svg>
    </div>
  )
}
