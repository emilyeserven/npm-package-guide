import type { ReactNode } from 'react'

/**
 * Parses a string with backtick-delimited code segments into React nodes.
 * Text outside backticks renders as plain text; text inside backticks
 * renders as inline `<code>` elements.
 */
export function parseInlineCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/)
  if (parts.length === 1) return text

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part ? <span key={i}>{part}</span> : null
  })
}
