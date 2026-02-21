import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SKILL_WRITING_TIPS } from '../../../data/claudeSkillsData'

function Collapsible({
  title,
  defaultOpen,
  isDark,
  children,
}: {
  title: string
  defaultOpen: boolean
  isDark: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className="rounded-lg overflow-hidden border"
      style={{ borderColor: ds('#e5e7eb', '#334155', isDark) }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-sm transition-colors"
        style={{
          background: ds('#f9fafb', '#0f172a', isDark),
          color: ds('#1f2937', '#e2e8f0', isDark),
        }}
      >
        <span>{title}</span>
        <span
          className="transition-transform duration-200"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: ds('#9ca3af', '#64748b', isDark),
          }}
        >
          &#9660;
        </span>
      </button>
      {open && (
        <div className="px-4 py-3 text-sm" style={{ color: ds('#374151', '#94a3b8', isDark) }}>
          {children}
        </div>
      )}
    </div>
  )
}

function CompareBox({
  good,
  bad,
  goodLabel,
  badLabel,
  isDark,
}: {
  good: string
  bad: string
  goodLabel: string
  badLabel: string
  isDark: boolean
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
      <div
        className="rounded-lg border-2 p-4"
        style={{
          borderColor: ds('#a7f3d0', '#065f46', isDark),
          background: ds('#ecfdf5', '#064e3b22', isDark),
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-wide mb-2"
          style={{ color: ds('#065f46', '#6ee7b7', isDark) }}
        >
          {goodLabel}
        </div>
        <div
          className="text-sm font-mono"
          style={{ color: ds('#1f2937', '#cbd5e1', isDark) }}
        >
          {good}
        </div>
      </div>
      <div
        className="rounded-lg border-2 p-4"
        style={{
          borderColor: ds('#fecdd3', '#9f1239', isDark),
          background: ds('#fff1f2', '#9f122722', isDark),
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-wide mb-2"
          style={{ color: ds('#9f1239', '#fda4af', isDark) }}
        >
          {badLabel}
        </div>
        <div
          className="text-sm font-mono"
          style={{ color: ds('#1f2937', '#cbd5e1', isDark) }}
        >
          {bad}
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ children, filename, isDark }: { children: string; filename?: string; isDark: boolean }) {
  return (
    <div
      className="rounded-lg overflow-hidden border mt-3 text-sm"
      style={{ borderColor: ds('#e5e7eb', '#334155', isDark) }}
    >
      {filename && (
        <div
          className="px-4 py-2 text-xs font-mono"
          style={{
            background: ds('#1f2937', '#0f172a', isDark),
            color: ds('#d1d5db', '#94a3b8', isDark),
          }}
        >
          {filename}
        </div>
      )}
      <pre
        className="p-4 overflow-x-auto"
        style={{
          background: ds('#111827', '#0f172a', isDark),
          color: ds('#f3f4f6', '#e2e8f0', isDark),
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function SkillWritingTips() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        The body of SKILL.md is what Claude reads after it decides to use your skill. This is where
        you give the actual instructions. The writing style here matters a lot &mdash; you&apos;re
        writing instructions for an intelligent model, not a rule engine.
      </p>

      <div className="flex flex-col gap-3">
        {SKILL_WRITING_TIPS.map((tip, i) => (
          <Collapsible key={i} title={tip.title} defaultOpen={tip.defaultOpen ?? false} isDark={isDark}>
            <p className="mb-2">{tip.explanation}</p>
            {tip.good && tip.bad && (
              <CompareBox
                good={tip.good}
                bad={tip.bad}
                goodLabel={tip.goodLabel ?? 'Good'}
                badLabel={tip.badLabel ?? 'Bad'}
                isDark={isDark}
              />
            )}
            {tip.codeExample && (
              <CodeBlock filename={tip.codeFilename} isDark={isDark}>
                {tip.codeExample}
              </CodeBlock>
            )}
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
