import type { ReactNode, CSSProperties } from 'react'
import { useIsDark } from '../../hooks/useTheme'

/**
 * Shared themed card container for info cards across guides.
 * Provides consistent border, background, and optional left accent strip.
 * Content is passed as children — the card only handles the shell.
 */
export function CardBase({
  children,
  accentColor,
  className = '',
  style,
}: {
  children: ReactNode
  /** Optional left border accent color */
  accentColor?: string
  className?: string
  style?: CSSProperties
}) {
  const isDark = useIsDark()

  return (
    <div
      className={`rounded-xl border p-5 ${className}`}
      style={{
        background: isDark ? '#1e293b' : '#ffffff',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        ...(accentColor ? { borderLeftWidth: '4px', borderLeftColor: accentColor } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
