import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { PLUGINS } from '../../../data/coworkData'

export function CoworkPluginCards() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-2.5 mb-6">
      {PLUGINS.map((plugin) => (
        <div
          key={plugin.name}
          className="rounded-xl border p-4"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderColor: ds('#e2e8f0', '#334155', isDark),
          }}
        >
          <div
            className="font-mono text-sm font-semibold mb-1.5"
            style={{ color: ds('#ea580c', '#E8572A', isDark) }}
          >
            {plugin.name}
          </div>
          <p
            className="text-sm leading-relaxed m-0 mb-2.5"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
          >
            {plugin.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {plugin.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full font-mono text-xs border"
                style={{
                  background: ds('#f1f5f9', '#0f172a', isDark),
                  borderColor: ds('#e2e8f0', '#334155', isDark),
                  color: ds('#94a3b8', '#64748b', isDark),
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
