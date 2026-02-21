import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { GOOD_DESCRIPTION, BAD_DESCRIPTION, DESCRIPTION_CHECKLIST } from '../../../data/claudeSkillsData'
import { CardBase } from '../CardBase'

export function SkillDescriptionDemo() {
  const isDark = useIsDark()
  const [activeTab, setActiveTab] = useState<'good' | 'bad'>('good')

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        The{' '}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{
            background: ds('#f3f4f6', '#334155', isDark),
            color: ds('#7c3aed', '#a78bfa', isDark),
          }}
        >
          description
        </code>{' '}
        field in SKILL.md frontmatter is the <em>most important part</em> of your skill. It&apos;s
        the <strong>primary triggering mechanism</strong> &mdash; Claude reads all skill descriptions
        and uses them to decide which skill to consult. If your description is vague, Claude
        won&apos;t know when to use your skill.
      </p>

      {/* Checklist card */}
      <CardBase
        style={{
          background: ds('#f5f3ff', '#4c1d9522', isDark),
          borderColor: ds('#ddd6fe', '#4c1d95', isDark),
        }}
      >
        <h4
          className="font-semibold mb-2"
          style={{ color: ds('#4c1d95', '#c4b5fd', isDark) }}
        >
          What a Good Description Includes
        </h4>
        <ul className="space-y-1.5 text-sm">
          {DESCRIPTION_CHECKLIST.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
              style={{ color: ds('#374151', '#cbd5e1', isDark) }}
            >
              <span style={{ color: ds('#7c3aed', '#a78bfa', isDark) }} className="mt-0.5">
                &rarr;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </CardBase>

      {/* Tab switcher */}
      <div
        className="rounded-lg overflow-hidden border"
        style={{ borderColor: ds('#e5e7eb', '#334155', isDark) }}
      >
        <div
          className="flex border-b"
          style={{
            background: ds('#f9fafb', '#0f172a', isDark),
            borderColor: ds('#e5e7eb', '#334155', isDark),
          }}
        >
          {(['good', 'bad'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                background: activeTab === tab
                  ? tab === 'good'
                    ? ds('#ecfdf5', '#064e3b33', isDark)
                    : ds('#fff1f2', '#9f122733', isDark)
                  : 'transparent',
                color: activeTab === tab
                  ? tab === 'good'
                    ? ds('#065f46', '#6ee7b7', isDark)
                    : ds('#9f1239', '#fda4af', isDark)
                  : ds('#6b7280', '#64748b', isDark),
                borderBottom: activeTab === tab
                  ? `2px solid ${tab === 'good' ? ds('#10b981', '#059669', isDark) : ds('#f43f5e', '#e11d48', isDark)}`
                  : '2px solid transparent',
              }}
            >
              {tab === 'good' ? '\u2705 Effective Description' : '\u274C Weak Description'}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === 'good' ? (
            <div className="space-y-2">
              <p
                className="text-sm font-mono p-3 rounded-lg border leading-relaxed"
                style={{
                  background: ds('#ecfdf5', '#064e3b22', isDark),
                  borderColor: ds('#a7f3d0', '#065f46', isDark),
                  color: ds('#374151', '#cbd5e1', isDark),
                }}
              >
                {GOOD_DESCRIPTION}
              </p>
              <p className="text-xs" style={{ color: ds('#065f46', '#6ee7b7', isDark) }}>
                &uarr; Lists trigger phrases, file types, deliverable names, AND exclusions. Slightly pushy.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p
                className="text-sm font-mono p-3 rounded-lg border leading-relaxed"
                style={{
                  background: ds('#fff1f2', '#9f122722', isDark),
                  borderColor: ds('#fecdd3', '#9f1239', isDark),
                  color: ds('#374151', '#cbd5e1', isDark),
                }}
              >
                {BAD_DESCRIPTION}
              </p>
              <p className="text-xs" style={{ color: ds('#9f1239', '#fda4af', isDark) }}>
                &uarr; Too vague. Which documents? When should Claude use it vs. another skill? No trigger phrases. Will rarely fire.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Warning callout */}
      <CardBase
        style={{
          background: ds('#fffbeb', '#78350f22', isDark),
          borderColor: ds('#fde68a', '#78350f', isDark),
        }}
      >
        <p className="text-sm" style={{ color: ds('#92400e', '#fbbf24', isDark) }}>
          <strong>Claude tends to under-trigger skills</strong> &mdash; it errs on the side of not
          using them. Combat this by being a little &quot;pushy&quot; in your description. Include
          phrases like &quot;Make sure to use this skill whenever...&quot; and enumerate edge cases
          where the skill applies even if the user doesn&apos;t explicitly ask for it.
        </p>
      </CardBase>
    </div>
  )
}
