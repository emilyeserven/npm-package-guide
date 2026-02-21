import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SKILL_SCENARIOS } from '../../../data/claudeSkillsData'
import { CardBase } from '../CardBase'

export function SkillScenarioCards() {
  const isDark = useIsDark()
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        Not everything should be a skill. The key question is:{' '}
        <strong>Would Claude produce significantly better results with structured guidance than without?</strong>{' '}
        Click each scenario to see if it&apos;s a good candidate.
      </p>

      <div className="flex flex-col gap-2">
        {SKILL_SCENARIOS.map((s, i) => {
          const isActive = selected === i
          const good = s.verdict
          return (
            <button
              key={i}
              onClick={() => setSelected(isActive ? null : i)}
              className="text-left p-3 rounded-lg border-2 transition-all"
              style={{
                borderColor: isActive
                  ? good
                    ? ds('#34d399', '#059669', isDark)
                    : ds('#fb7185', '#e11d48', isDark)
                  : ds('#e5e7eb', '#334155', isDark),
                background: isActive
                  ? good
                    ? ds('#ecfdf5', '#064e3b22', isDark)
                    : ds('#fff1f2', '#9f122722', isDark)
                  : ds('#ffffff', '#1e293b', isDark),
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-medium text-sm"
                  style={{ color: ds('#1f2937', '#e2e8f0', isDark) }}
                >
                  {s.title}
                </span>
                {isActive && (
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold border"
                    style={{
                      background: good
                        ? ds('#d1fae5', '#064e3b44', isDark)
                        : ds('#ffe4e6', '#9f122744', isDark),
                      color: good
                        ? ds('#065f46', '#6ee7b7', isDark)
                        : ds('#9f1239', '#fda4af', isDark),
                      borderColor: good
                        ? ds('#a7f3d0', '#065f46', isDark)
                        : ds('#fecdd3', '#9f1239', isDark),
                    }}
                  >
                    {good ? 'Good Candidate' : 'Skip the Skill'}
                  </span>
                )}
              </div>
              {isActive && (
                <p
                  className="text-xs mt-2 leading-relaxed"
                  style={{ color: ds('#4b5563', '#94a3b8', isDark) }}
                >
                  {s.example}
                </p>
              )}
            </button>
          )
        })}
      </div>

      <CardBase
        style={{
          background: ds('#fffbeb', '#78350f22', isDark),
          borderColor: ds('#fde68a', '#78350f', isDark),
        }}
      >
        <p className="text-sm" style={{ color: ds('#92400e', '#fbbf24', isDark) }}>
          <strong>Rule of thumb:</strong> If Claude would benefit from a &quot;cheat sheet&quot; of
          best practices, preferred tools, output structure, or common pitfalls for a task &mdash;
          that&apos;s a skill. If Claude can do it well from a simple prompt, it&apos;s not.
        </p>
      </CardBase>
    </div>
  )
}
