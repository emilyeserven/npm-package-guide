import { useState } from 'react'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

/**
 * Small copy-to-clipboard button with theme-aware styling.
 * Default: absolutely positioned for overlay on a `relative` parent.
 * Pass `className` to override positioning/sizing for inline usage.
 */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const isDark = useIsDark()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className={className ?? 'absolute top-2 right-2 px-2.5 py-1 rounded text-xs font-mono border transition-colors cursor-pointer'}
      style={{
        background: copied
          ? ds('#dcfce7', '#14532d', isDark)
          : ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
        color: copied
          ? ds('#15803d', '#86efac', isDark)
          : ds('#94a3b8', '#64748b', isDark),
      }}
    >
      {copied ? '\u2713 copied' : 'copy'}
    </button>
  )
}
