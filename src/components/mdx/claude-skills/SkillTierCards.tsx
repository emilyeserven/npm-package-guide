import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SKILL_TIERS } from '../../../data/claudeSkillsData'
import { CardBase } from '../CardBase'

const BADGE_COLORS: Record<string, { light: string; dark: string; lightText: string; darkText: string; lightBorder: string; darkBorder: string }> = {
  success: {
    light: '#d1fae5', dark: '#064e3b44',
    lightText: '#065f46', darkText: '#6ee7b7',
    lightBorder: '#a7f3d0', darkBorder: '#065f46',
  },
  info: {
    light: '#dbeafe', dark: '#1e3a5f44',
    lightText: '#1e40af', darkText: '#93c5fd',
    lightBorder: '#93c5fd', darkBorder: '#1e3a5f',
  },
  purple: {
    light: '#ede9fe', dark: '#4c1d9544',
    lightText: '#5b21b6', darkText: '#c4b5fd',
    lightBorder: '#c4b5fd', darkBorder: '#4c1d95',
  },
}

export function SkillTierCards() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        A <strong>Claude Skill</strong> is a reusable instruction package that teaches Claude how to
        do a specific type of task really well. Think of it like a recipe card &mdash; Claude reads
        it at the right moment and follows its guidance to produce consistently high-quality results.
      </p>

      <CardBase
        style={{
          background: `linear-gradient(135deg, ${ds('#f5f3ff', '#4c1d9522', isDark)}, ${ds('#f0f9ff', '#0c4a6e22', isDark)})`,
          borderColor: ds('#ddd6fe', '#4c1d95', isDark),
        }}
      >
        <h4
          className="font-semibold mb-3"
          style={{ color: ds('#4c1d95', '#c4b5fd', isDark) }}
        >
          The Core Mental Model
        </h4>
        <p className="text-sm mb-3" style={{ color: ds('#374151', '#cbd5e1', isDark) }}>
          Skills operate on a <strong>progressive disclosure</strong> system with three tiers:
        </p>
        <div className="flex flex-col gap-2">
          {SKILL_TIERS.map(item => {
            const c = BADGE_COLORS[item.color]
            return (
              <div
                key={item.level}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: ds('#ffffff88', '#ffffff0a', isDark) }}
              >
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap"
                  style={{
                    background: ds(c.light, c.dark, isDark),
                    color: ds(c.lightText, c.darkText, isDark),
                    borderColor: ds(c.lightBorder, c.darkBorder, isDark),
                  }}
                >
                  {item.badge}
                </span>
                <div>
                  <div
                    className="font-medium text-sm"
                    style={{ color: ds('#111827', '#f1f5f9', isDark) }}
                  >
                    {item.level}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: ds('#4b5563', '#94a3b8', isDark) }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardBase>

      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        Conceptually, a skill is ideal for any task where Claude benefits from{' '}
        <strong>structured, repeatable guidance</strong> rather than figuring things out from
        scratch. Without a skill, Claude might produce a different (and inconsistent) approach
        every time. With one, it follows proven patterns that have been refined through iteration.
      </p>
    </div>
  )
}
