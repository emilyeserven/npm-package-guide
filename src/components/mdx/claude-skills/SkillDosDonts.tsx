import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SKILL_DOS, SKILL_DONTS } from '../../../data/claudeSkillsData'
import type { SkillGuideline } from '../../../data/claudeSkillsData'

function GuidelineList({
  items,
  variant,
  isDark,
}: {
  items: SkillGuideline[]
  variant: 'do' | 'dont'
  isDark: boolean
}) {
  const isDo = variant === 'do'

  return (
    <div className="flex flex-col gap-2">
      {items.map((d, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg border"
          style={{
            background: isDo
              ? ds('#ecfdf5', '#064e3b22', isDark)
              : ds('#fff1f2', '#9f122722', isDark),
            borderColor: isDo
              ? ds('#d1fae5', '#065f46', isDark)
              : ds('#ffe4e6', '#9f1239', isDark),
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
            style={{
              background: isDo
                ? ds('#a7f3d0', '#065f46', isDark)
                : ds('#fecdd3', '#9f1239', isDark),
              color: isDo
                ? ds('#065f46', '#6ee7b7', isDark)
                : ds('#9f1239', '#fda4af', isDark),
            }}
          >
            {isDo ? i + 1 : '\u2715'}
          </div>
          <div>
            <div
              className="font-medium text-sm"
              style={{
                color: isDo
                  ? ds('#065f46', '#6ee7b7', isDark)
                  : ds('#9f1239', '#fda4af', isDark),
              }}
            >
              {d.title}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: ds('#4b5563', '#94a3b8', isDark) }}
            >
              {d.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkillDos() {
  const isDark = useIsDark()
  return <GuidelineList items={SKILL_DOS} variant="do" isDark={isDark} />
}

export function SkillDonts() {
  const isDark = useIsDark()
  return <GuidelineList items={SKILL_DONTS} variant="dont" isDark={isDark} />
}
