import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_ARCH_NODES } from '../../../data/eksData'
import type { EksArchNode } from '../../../data/eksData'

function ArchNode({ node }: { node: EksArchNode }) {
  const isDark = useIsDark()
  const [hovered, setHovered] = useState(false)
  const color = ds(node.color, node.darkColor, isDark)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl border p-4 transition-all cursor-default"
      style={{
        background: hovered
          ? `${color}12`
          : tc(theme.bgCard, isDark),
        borderColor: hovered ? color : tc(theme.borderDefault, isDark),
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div
        className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
        style={{ color }}
      >
        {node.label}
      </div>
      {node.items.map((item, i) => (
        <div
          key={i}
          className="text-sm py-0.5 flex items-center gap-1.5"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          <span style={{ color, fontSize: 8 }}>{'\u25CF'}</span>
          {item}
        </div>
      ))}
    </div>
  )
}

export function EksArchitectureDiagram() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
      {EKS_ARCH_NODES.map((node) => (
        <ArchNode key={node.label} node={node} />
      ))}
    </div>
  )
}
