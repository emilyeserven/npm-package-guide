import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function NginxReverseProxyDiagram() {
  const isDark = useIsDark()

  const accent = ds('#059669', '#34d399', isDark)
  const accentMuted = ds('#059669', '#34d399', isDark) + (isDark ? '40' : '30')
  const accentBg = ds('rgba(5,150,105,0.08)', 'rgba(52,211,153,0.08)', isDark)
  const textPrimary = ds('#374151', '#e2e8f0', isDark)
  const textMuted = ds('#64748b', '#94a3b8', isDark)

  const backends = [
    { label: 'React SPA', port: ':80 static', y: 15 },
    { label: 'Node API', port: ':3000', y: 75 },
    { label: 'Admin App', port: ':4000', y: 135 },
  ]

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6 my-6 overflow-x-auto">
      <svg viewBox="0 0 700 180" className="w-full max-w-[700px]">
        <defs>
          <marker id="nginx-rp-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={accent} />
          </marker>
        </defs>

        {/* Client */}
        <rect x="20" y="55" width="100" height="60" rx="8" fill={accentBg} stroke={accentMuted} strokeWidth="1" />
        <text x="70" y="82" textAnchor="middle" fill={textPrimary} fontSize="11" fontFamily="monospace">Browser</text>
        <text x="70" y="98" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">HTTPS :443</text>

        <line x1="120" y1="85" x2="210" y2="85" stroke={accent} strokeWidth="1.5" markerEnd="url(#nginx-rp-arrow)" />
        <text x="165" y="75" textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">HTTPS</text>

        {/* Nginx */}
        <rect x="215" y="35" width="140" height="100" rx="10" fill={accentBg} stroke={accent} strokeWidth="1.5" />
        <text x="285" y="62" textAnchor="middle" fill={accent} fontSize="13" fontFamily="monospace" fontWeight="bold">NGINX</text>
        <text x="285" y="79" textAnchor="middle" fill={textPrimary} fontSize="9" fontFamily="monospace">reverse proxy</text>
        <text x="285" y="93" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">TLS termination</text>
        <text x="285" y="107" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">routing · caching</text>
        <text x="285" y="121" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">rate limiting</text>

        <text x="400" y="50" textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">HTTP</text>

        {/* Backends */}
        {backends.map((b, i) => (
          <g key={i}>
            <line x1="355" y1="85" x2="440" y2={b.y + 25} stroke={accentMuted} strokeWidth="1" markerEnd="url(#nginx-rp-arrow)" />
            <rect x="445" y={b.y} width="120" height="48" rx="6" fill={accentBg} stroke={accentMuted} strokeWidth="1" />
            <text x="505" y={b.y + 22} textAnchor="middle" fill={textPrimary} fontSize="10" fontFamily="monospace">{b.label}</text>
            <text x="505" y={b.y + 37} textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">{b.port}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
