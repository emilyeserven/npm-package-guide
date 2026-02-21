import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import {
  BASICS_EXAMPLES,
  INCORRECT_EXAMPLES,
  CORRECT_EXAMPLES,
  GOTCHA_EXAMPLES,
  SLICES_EXAMPLES,
  MIDDLEWARE_EXAMPLES,
  ADVANCED_EXAMPLES,
  API_REFERENCE,
} from '../../../data/zustandData'
import type { CodeExample } from '../../../data/zustandData'

const ALL_EXAMPLES: CodeExample[] = [
  ...BASICS_EXAMPLES,
  ...INCORRECT_EXAMPLES,
  ...CORRECT_EXAMPLES,
  ...GOTCHA_EXAMPLES,
  ...SLICES_EXAMPLES,
  ...MIDDLEWARE_EXAMPLES,
  ...ADVANCED_EXAMPLES,
]

const VARIANT_COLORS = {
  good: { light: '#059669', dark: '#10b981', bgLight: '#ecfdf5', bgDark: '#064e3b', labelLight: '#065f46', labelDark: '#6ee7b7', prefix: '\u2713 ' },
  bad: { light: '#dc2626', dark: '#ef4444', bgLight: '#fef2f2', bgDark: '#7f1d1d', labelLight: '#991b1b', labelDark: '#fca5a5', prefix: '\u2717 ' },
  info: { light: '#2563eb', dark: '#3b82f6', bgLight: '#eff6ff', bgDark: '#1e3a5f', labelLight: '#1e40af', labelDark: '#93c5fd', prefix: '\u2139 ' },
  neutral: { light: '#64748b', dark: '#94a3b8', bgLight: '#f8fafc', bgDark: '#1a2230', labelLight: '#475569', labelDark: '#94a3b8', prefix: '' },
}

export function ZstCodeBlock({ exampleId }: { exampleId: string }) {
  const isDark = useIsDark()
  const example = ALL_EXAMPLES.find((e) => e.id === exampleId)
  if (!example) return null

  const v = VARIANT_COLORS[example.variant]
  const borderColor = ds(v.light, v.dark, isDark)
  const labelBg = ds(v.bgLight, v.bgDark, isDark)
  const labelColor = ds(v.labelLight, v.labelDark, isDark)
  const codeBg = ds('#f8fafc', '#0d1117', isDark)
  const codeColor = ds('#1e293b', '#c9d1d9', isDark)

  return (
    <div
      className="rounded-lg overflow-hidden mb-4"
      style={{ border: `1px solid ${borderColor}` }}
    >
      {example.label && (
        <div
          className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider font-mono"
          style={{ background: labelBg, color: labelColor }}
        >
          {v.prefix}{example.label}
        </div>
      )}
      <pre
        className="m-0 overflow-x-auto text-sm leading-7 font-mono"
        style={{ background: codeBg, padding: '16px 18px' }}
      >
        <code style={{ color: codeColor }}>{example.code}</code>
      </pre>
    </div>
  )
}

/**
 * Renders a sequence of code blocks by their example IDs.
 * Accepts a comma-separated string of IDs.
 */
export function ZstCodeGroup({ ids }: { ids: string }) {
  const idList = ids.split(',').map((s) => s.trim())
  return (
    <div className="mb-2">
      {idList.map((id) => (
        <ZstCodeBlock key={id} exampleId={id} />
      ))}
    </div>
  )
}

/**
 * Renders the API quick-reference table on the Advanced page.
 */
export function ZstApiRef() {
  const isDark = useIsDark()

  return (
    <div
      className="rounded-lg overflow-hidden mb-5 text-sm"
      style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
    >
      {API_REFERENCE.map((row, i) => (
        <div
          key={row.method}
          className="grid grid-cols-[auto_1fr]"
          style={{ borderTop: i > 0 ? `1px solid ${tc(theme.borderDefault, isDark)}` : undefined }}
        >
          <div
            className="px-3.5 py-2 font-mono font-semibold"
            style={{
              background: ds('#f1f5f9', '#0d1117', isDark),
              color: ds('#d97706', '#f59e0b', isDark),
            }}
          >
            {row.method}
          </div>
          <div
            className="px-3.5 py-2"
            style={{
              background: tc(theme.bgCard, isDark),
              color: tc(theme.textPrimary, isDark),
            }}
          >
            {row.description}
          </div>
        </div>
      ))}
    </div>
  )
}
