import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { REDIS_COMMANDS_DATA } from '../../../data/redisData'

export function RedisCommandReference() {
  const isDark = useIsDark()
  const [activeCategory, setActiveCategory] = useState('Strings')

  const activeCat = REDIS_COMMANDS_DATA.find((c) => c.category === activeCategory)

  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-2 flex-wrap">
        {REDIS_COMMANDS_DATA.map((cat) => {
          const isActive = activeCategory === cat.category
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer"
              style={{
                color: isActive
                  ? ds(cat.color, cat.darkColor, isDark)
                  : tc(theme.textMuted, isDark),
                background: isActive
                  ? ds(cat.color + '10', cat.darkColor + '15', isDark)
                  : ds('#f8fafc', '#0f172a', isDark),
                borderColor: isActive
                  ? ds(cat.color + '30', cat.darkColor + '30', isDark)
                  : ds('#e2e8f0', '#334155', isDark),
              }}
            >
              {cat.category}
            </button>
          )
        })}
      </div>
      {activeCat && (
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            background: tc(theme.bgCard, isDark),
            borderColor: tc(theme.borderDefault, isDark),
          }}
        >
          {activeCat.commands.map((cmd, i) => (
            <div
              key={cmd.cmd}
              className="px-5 py-3.5 flex items-start gap-4"
              style={{
                borderTop: i > 0 ? `1px solid ${tc(theme.borderDefault, isDark)}` : 'none',
              }}
            >
              <code
                className="text-sm font-mono shrink-0"
                style={{
                  color: ds(activeCat.color, activeCat.darkColor, isDark),
                  minWidth: 220,
                }}
              >
                {cmd.cmd}
              </code>
              <span
                className="text-sm"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                {cmd.desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
