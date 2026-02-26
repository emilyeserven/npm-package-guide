import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSS_FILE_TREE } from '../../../data/tanstackStartData'
import type { TssFileNode } from '../../../data/tanstackStartData'

function TreeNode({ node, depth }: { node: TssFileNode; depth: number }) {
  const isDark = useIsDark()
  const isFolder = node.type === 'folder'

  return (
    <>
      <div
        className="flex items-center gap-2 py-0.5 font-mono text-xs"
        style={{ paddingLeft: depth * 20 }}
      >
        <span className="text-[11px]">{isFolder ? '📁' : '📄'}</span>
        <span
          style={{
            color: isFolder
              ? ds('#d97706', '#fbbf24', isDark)
              : node.highlight
                ? ds('#3b82f6', '#60a5fa', isDark)
                : tc(theme.textMuted, isDark),
          }}
        >
          {node.name}
        </span>
        {node.description && (
          <span
            className="text-[11px] italic"
            style={{ color: ds('#94a3b8', '#475569', isDark) }}
          >
            — {node.description}
          </span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </>
  )
}

export function TssFileTree() {
  const isDark = useIsDark()

  return (
    <div
      className="rounded-xl p-5 mb-6"
      style={{
        background: tc(theme.bgCard, isDark),
        border: `1px solid ${tc(theme.borderDefault, isDark)}`,
      }}
    >
      {TSS_FILE_TREE.map((node, i) => (
        <TreeNode key={i} node={node} depth={0} />
      ))}
    </div>
  )
}
