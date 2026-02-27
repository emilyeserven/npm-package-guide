import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { CopyButton } from '../CopyButton'
import { GO_HTTP_SERVER_EXAMPLE, GO_TS_CODE_EXAMPLES } from '../../../data/goLangData'
import type { GoCodeExample } from '../../../data/goLangData'

const ALL_EXAMPLES: Record<string, GoCodeExample> = {
  'http-server': GO_HTTP_SERVER_EXAMPLE,
  ...Object.fromEntries(GO_TS_CODE_EXAMPLES.map((ex) => [ex.id, ex])),
}

function LangBadge({ lang, isDark }: { lang: string; isDark: boolean }) {
  const colors: Record<string, { bg: string; darkBg: string; color: string; darkColor: string }> = {
    go: { bg: 'rgba(0,173,216,0.12)', darkBg: 'rgba(0,173,216,0.18)', color: '#0891b2', darkColor: '#22d3ee' },
    typescript: { bg: 'rgba(49,120,198,0.12)', darkBg: 'rgba(49,120,198,0.18)', color: '#2563eb', darkColor: '#60a5fa' },
    python: { bg: 'rgba(255,212,59,0.12)', darkBg: 'rgba(255,212,59,0.15)', color: '#ca8a04', darkColor: '#facc15' },
  }
  const c = colors[lang] ?? colors.go
  return (
    <span
      className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
      style={{ background: ds(c.bg, c.darkBg, isDark), color: ds(c.color, c.darkColor, isDark) }}
    >
      {lang === 'typescript' ? 'TS' : lang === 'python' ? 'Python' : 'Go'}
    </span>
  )
}

export function GoCodeCompare({ exampleId }: { exampleId: string }) {
  const isDark = useIsDark()
  const example = ALL_EXAMPLES[exampleId]
  if (!example) return null

  const codeBg = ds('#f8fafc', '#0d1117', isDark)
  const headerBg = ds('#f1f5f9', '#151b23', isDark)
  const borderColor = ds('#e2e8f0', '#2d3748', isDark)
  const codeColor = ds('#334155', '#c9d1d9', isDark)

  const renderBlock = (label: string, lang: string, code: string) => (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor }}>
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ background: headerBg, borderColor }}
      >
        <span className="text-xs font-semibold" style={{ color: ds('#475569', '#94a3b8', isDark) }}>
          {label}
        </span>
        <div className="flex items-center gap-2">
          <CopyButton
            text={code}
            className="px-2 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer"
          />
          <LangBadge lang={lang} isDark={isDark} />
        </div>
      </div>
      <pre
        className="p-4 m-0 overflow-x-auto text-xs leading-relaxed font-mono"
        style={{ background: codeBg, color: codeColor }}
      >
        {code}
      </pre>
    </div>
  )

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {renderBlock(example.leftLabel, example.leftLang, example.leftCode)}
        {renderBlock(example.rightLabel, example.rightLang, example.rightCode)}
      </div>
      {example.note && (
        <div
          className="mt-3 rounded-lg border-l-3 pl-4 py-3 text-sm leading-relaxed"
          style={{
            borderColor: ds(
              example.noteType === 'warning' ? '#f59e0b' : example.noteType === 'tip' ? '#22c55e' : '#3b82f6',
              example.noteType === 'warning' ? '#fbbf24' : example.noteType === 'tip' ? '#4ade80' : '#60a5fa',
              isDark,
            ),
            background: ds('rgba(59,130,246,0.04)', 'rgba(59,130,246,0.06)', isDark),
            color: ds('#475569', '#cbd5e1', isDark),
          }}
          dangerouslySetInnerHTML={{ __html: example.note }}
        />
      )}
    </div>
  )
}
