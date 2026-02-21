import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { BUNDLED_RESOURCE_TYPES } from '../../../data/claudeSkillsData'
import { CardBase } from '../CardBase'

export function SkillResourceCards() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        Bundled resources extend your skill beyond what SKILL.md alone can do. They&apos;re loaded
        on demand, keeping the initial context footprint small.
      </p>

      <div className="flex flex-col gap-3">
        {BUNDLED_RESOURCE_TYPES.map(r => (
          <CardBase
            key={r.title}
            style={{
              background: ds(r.lightBg, r.darkBg, isDark),
              borderColor: ds(r.lightBorder, r.darkBorder, isDark),
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <h4
                  className="font-semibold font-mono text-sm"
                  style={{ color: ds('#111827', '#f1f5f9', isDark) }}
                >
                  {r.title}
                </h4>
                <p
                  className="text-sm mt-1"
                  style={{ color: ds('#374151', '#cbd5e1', isDark) }}
                >
                  {r.desc}
                </p>
                <p
                  className="text-xs mt-1.5 italic"
                  style={{ color: ds('#6b7280', '#64748b', isDark) }}
                >
                  e.g. {r.example}
                </p>
              </div>
            </div>
          </CardBase>
        ))}
      </div>

      <CardBase>
        <h4
          className="font-semibold text-sm mb-2"
          style={{ color: ds('#1f2937', '#f1f5f9', isDark) }}
        >
          When to bundle a script vs. leave it inline
        </h4>
        <p className="text-sm" style={{ color: ds('#374151', '#94a3b8', isDark) }}>
          Read the transcripts from test runs. If every invocation independently writes a similar
          helper script (e.g., every test case produces its own{' '}
          <code
            className="px-1 rounded text-xs"
            style={{
              background: ds('#e5e7eb', '#334155', isDark),
              color: ds('#374151', '#cbd5e1', isDark),
            }}
          >
            create_docx.py
          </code>
          ), that&apos;s a strong signal to write it once, put it in{' '}
          <code
            className="px-1 rounded text-xs"
            style={{
              background: ds('#e5e7eb', '#334155', isDark),
              color: ds('#374151', '#cbd5e1', isDark),
            }}
          >
            scripts/
          </code>
          , and reference it from the skill. This saves every future invocation from reinventing
          the wheel.
        </p>
      </CardBase>
    </div>
  )
}
