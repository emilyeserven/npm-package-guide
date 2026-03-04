import { useIsDark } from '../../../hooks/useTheme'
import { BAUTH_ARCH_BOXES, BAUTH_ARCH_ARROWS } from '../../../data/betterAuthData'

export function BauthArchDiagram() {
  const isDark = useIsDark()

  return (
    <svg
      viewBox="0 0 520 300"
      className="w-full block mx-auto my-5"
      style={{ maxWidth: 520 }}
    >
      <defs>
        <marker
          id="ba-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            fill={isDark ? '#555' : '#94a3b8'}
          />
        </marker>
      </defs>

      {BAUTH_ARCH_ARROWS.map((a, i) => (
        <line
          key={i}
          x1={a.x1}
          y1={a.y1}
          x2={a.x2}
          y2={a.y2}
          stroke={isDark ? '#555' : '#94a3b8'}
          strokeWidth="1.5"
          markerEnd="url(#ba-arrow)"
        />
      ))}

      {BAUTH_ARCH_BOXES.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={33}
            rx={6}
            fill={isDark ? 'rgba(15,15,26,0.9)' : 'rgba(248,250,252,0.95)'}
            stroke={b.color}
            strokeWidth="1.5"
          />
          <text
            x={b.x + b.w / 2}
            y={b.y + 14}
            textAnchor="middle"
            fill={b.color}
            fontSize="10"
            fontWeight="600"
            fontFamily="ui-monospace, monospace"
          >
            {b.label}
          </text>
          <text
            x={b.x + b.w / 2}
            y={b.y + 27}
            textAnchor="middle"
            fill={isDark ? '#6b7280' : '#94a3b8'}
            fontSize="8.5"
            fontFamily="ui-monospace, monospace"
          >
            {b.sub}
          </text>
        </g>
      ))}
    </svg>
  )
}
