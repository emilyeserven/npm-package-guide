import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { CardBase } from '../CardBase'
import { StatusBadge } from '../StatusBadge'
import { FASTIFY_SECURITY_PLUGINS, FASTIFY_TAG_COLORS } from '../../../data/fastifyData'
import type { FastifyPlugin } from '../../../data/fastifyData'

export function FastifyPluginCards({ filter }: { filter?: 'essential' | 'recommended' | 'all' }) {
  const isDark = useIsDark()
  const plugins = filter && filter !== 'all'
    ? FASTIFY_SECURITY_PLUGINS.filter((p: FastifyPlugin) => p.tag === filter)
    : FASTIFY_SECURITY_PLUGINS

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {plugins.map((plugin: FastifyPlugin) => (
        <CardBase key={plugin.id}>
          <p
            className="font-mono text-sm font-semibold mb-1.5"
            style={{ color: ds('#65a30d', '#84cc16', isDark) }}
          >
            {plugin.name}
          </p>
          <p
            className="text-sm leading-relaxed mb-2.5"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {plugin.description}
          </p>
          <StatusBadge
            label={plugin.tag}
            colors={FASTIFY_TAG_COLORS[plugin.tag]}
          />
        </CardBase>
      ))}
    </div>
  )
}
