import { ds } from './darkStyle'

/**
 * Pre-defined theme color pairs for consistent styling.
 * Use with `tc()` helper: `tc(theme.textPrimary, isDark)`
 *
 * Centralizes the most frequently repeated ds() calls across
 * interactive components (explorers, diagrams, pros/cons, etc.).
 */
export const theme = {
  // Text
  textPrimary:   ['#1e293b', '#f1f5f9'] as const,  // main body text
  textSecondary: ['#374151', '#e2e8f0'] as const,  // detail / paragraph text
  textMuted:     ['#94a3b8', '#64748b'] as const,  // labels, captions
  // Backgrounds
  bgCard:        ['#fff',    '#1e293b'] as const,  // card / panel surface
  // Borders
  borderDefault: ['#e2e8f0', '#334155'] as const,  // standard border
  // Shadows
  shadowSm:      ['0 1px 4px #0001', '0 1px 4px #0003'] as const,
  shadowMd:      ['0 1px 5px #0001', '0 1px 5px #0003'] as const,
} as const

/** Shorthand for `ds(pair[0], pair[1], isDark)` */
export function tc(pair: readonly [string, string], isDark: boolean): string {
  return ds(pair[0], pair[1], isDark)
}
