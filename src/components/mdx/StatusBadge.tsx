import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

interface StatusBadgeColors {
  bg: string
  darkBg: string
  text: string
  darkText: string
  border?: string
  darkBorder?: string
}

/**
 * Shared pill badge for severity/status labels.
 * Pass light/dark color pairs — the component handles theme switching.
 */
export function StatusBadge({
  label,
  colors,
  uppercase = true,
  className = '',
}: {
  label: string
  colors: StatusBadgeColors
  uppercase?: boolean
  className?: string
}) {
  const isDark = useIsDark()
  const hasBorder = colors.border && colors.darkBorder

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${uppercase ? 'uppercase' : ''} ${className}`}
      style={{
        background: ds(colors.bg, colors.darkBg, isDark),
        color: ds(colors.text, colors.darkText, isDark),
        ...(hasBorder ? { border: `1px solid ${ds(colors.border!, colors.darkBorder!, isDark)}` } : {}),
      }}
    >
      {label}
    </span>
  )
}
