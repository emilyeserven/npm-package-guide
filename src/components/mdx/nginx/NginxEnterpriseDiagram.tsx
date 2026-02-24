import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function NginxEnterpriseDiagram() {
  const isDark = useIsDark()

  const accent = ds('#059669', '#34d399', isDark)
  const accentMuted = ds('#059669', '#34d399', isDark) + (isDark ? '40' : '30')
  const accentBg = ds('rgba(5,150,105,0.08)', 'rgba(52,211,153,0.08)', isDark)
  const textPrimary = ds('#374151', '#e2e8f0', isDark)
  const textMuted = ds('#64748b', '#94a3b8', isDark)
  const stroke = ds('#e2e8f0', '#334155', isDark)

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6 my-6 overflow-x-auto">
      <svg viewBox="0 0 720 280" className="w-full max-w-[720px]">
        <defs>
          <marker id="nginx-ent-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={accent} />
          </marker>
        </defs>

        {/* CDN */}
        <rect x="10" y="100" width="100" height="60" rx="8" fill={accentBg} stroke={stroke} strokeWidth="1" strokeDasharray="4" />
        <text x="60" y="127" textAnchor="middle" fill={textPrimary} fontSize="10" fontFamily="monospace">CDN / WAF</text>
        <text x="60" y="143" textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">Cloudflare etc</text>

        <line x1="110" y1="130" x2="160" y2="130" stroke={accentMuted} strokeWidth="1" markerEnd="url(#nginx-ent-arrow)" />

        {/* Load Balancer Nginx */}
        <rect x="165" y="85" width="130" height="90" rx="10" fill={accentBg} stroke={accent} strokeWidth="1.5" />
        <text x="230" y="112" textAnchor="middle" fill={accent} fontSize="11" fontFamily="monospace" fontWeight="bold">NGINX</text>
        <text x="230" y="127" textAnchor="middle" fill={textPrimary} fontSize="9" fontFamily="monospace">Load Balancer</text>
        <text x="230" y="142" textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">TLS · Rate Limit</text>
        <text x="230" y="155" textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">Canary Routing</text>

        {/* App Nginx instances */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <line x1="295" y1="130" x2="360" y2={50 + i * 90} stroke={accentMuted} strokeWidth="1" markerEnd="url(#nginx-ent-arrow)" />
            <rect x="365" y={25 + i * 90} width="110" height="50" rx="6" fill={accentBg} stroke={accentMuted} strokeWidth="1" />
            <text x="420" y={47 + i * 90} textAnchor="middle" fill={accent} fontSize="9" fontFamily="monospace">NGINX Sidecar</text>
            <text x="420" y={62 + i * 90} textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">+ App Pod {i + 1}</text>
          </g>
        ))}

        {/* Services */}
        {[
          { label: 'User Svc', y: 15 },
          { label: 'Product Svc', y: 105 },
          { label: 'Order Svc', y: 195 },
        ].map((s, i) => (
          <g key={i}>
            <line x1="475" y1={50 + i * 90} x2="530" y2={s.y + 28} stroke={accentMuted} strokeWidth="1" markerEnd="url(#nginx-ent-arrow)" />
            <rect x="535" y={s.y} width="90" height="45" rx="6" fill={accentBg} stroke={stroke} strokeWidth="1" />
            <text x="580" y={s.y + 22} textAnchor="middle" fill={textPrimary} fontSize="9" fontFamily="monospace">{s.label}</text>
            <text x="580" y={s.y + 36} textAnchor="middle" fill={textMuted} fontSize="8" fontFamily="monospace">:3000</text>
          </g>
        ))}

        {/* Database */}
        <rect x="640" y="85" width="70" height="90" rx="6" fill={accentBg} stroke={stroke} strokeWidth="1" strokeDasharray="4" />
        <text x="675" y="120" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">DB</text>
        <text x="675" y="135" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">Redis</text>
        <text x="675" y="150" textAnchor="middle" fill={textMuted} fontSize="9" fontFamily="monospace">Queue</text>
        <line x1="625" y1="130" x2="638" y2="130" stroke={accentMuted} strokeWidth="1" markerEnd="url(#nginx-ent-arrow)" />
      </svg>
    </div>
  )
}
