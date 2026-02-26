import { PAYLOAD_FLOW_NODES } from '../../../data/payloadData'
import { useExplorer } from '../../../hooks/useExplorer'
import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'

export function PayloadFlowDiagram() {
  const isDark = useIsDark()
  const { activeId, setActiveId, active } = useExplorer(PAYLOAD_FLOW_NODES, PAYLOAD_FLOW_NODES[0].id)

  return (
    <div className="mb-6">
      {/* Flow nodes */}
      <div className="flex items-center justify-center gap-0 flex-wrap py-4">
        {PAYLOAD_FLOW_NODES.map((node, i) => (
          <div key={node.id} className="flex items-center">
            <button
              onClick={() => setActiveId(node.id)}
              className="border rounded-lg px-4 py-3 text-center min-w-[110px] cursor-pointer transition-all duration-200"
              style={{
                background: activeId === node.id
                  ? (isDark ? '#334155' : '#fed7aa')
                  : (isDark ? '#1e293b' : '#ffffff'),
                borderColor: activeId === node.id
                  ? (isDark ? '#f97316' : '#f97316')
                  : (isDark ? '#334155' : '#e2e8f0'),
                boxShadow: activeId === node.id
                  ? `0 4px 16px ${isDark ? 'rgba(249, 115, 22, 0.15)' : 'rgba(249, 115, 22, 0.1)'}`
                  : 'none',
                transform: activeId === node.id ? 'translateY(-2px)' : 'none',
              }}
            >
              <div className="text-2xl mb-1">{node.icon}</div>
              <div
                className="font-mono text-xs tracking-wide"
                style={{ color: tc(theme.textSecondary, isDark) }}
              >
                {node.label}
              </div>
            </button>
            {i < PAYLOAD_FLOW_NODES.length - 1 && (
              <span
                className="px-2 text-lg shrink-0"
                style={{ color: isDark ? '#475569' : '#cbd5e1' }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Description panel */}
      {active && (
        <div
          className="rounded-lg border p-4 text-sm leading-relaxed mt-2"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            color: tc(theme.textSecondary, isDark),
          }}
          dangerouslySetInnerHTML={{ __html: active.description }}
        />
      )}
    </div>
  )
}
