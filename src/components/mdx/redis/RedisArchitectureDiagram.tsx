import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

function EventLoopSection() {
  const isDark = useIsDark()
  const clients = ['Your React App', 'Another User', 'Mobile App', 'Admin Dashboard']

  return (
    <div
      className="rounded-xl border p-6"
      style={{
        background: ds('#f8fafc', '#0f172a', isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      <h4 className="font-bold mb-4 mt-0" style={{ color: tc(theme.textPrimary, isDark) }}>
        Single-Threaded Event Loop
      </h4>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: ds('#64748b', '#94a3b8', isDark) }}
      >
        Redis uses a single-threaded event loop &mdash; exactly like JavaScript in the browser. Just as your
        React app processes events one at a time on the main thread, Redis processes commands one at a time in
        memory. Every command is atomic (no race conditions), and a single instance handles 100,000+ ops/sec.
        This is why your API can cache-check in microseconds.
      </p>
      <div className="grid grid-cols-4 gap-2 font-mono text-xs text-center">
        {clients.map((c) => (
          <div
            key={c}
            className="rounded-lg py-2"
            style={{
              background: ds('#eff6ff', 'rgba(56,189,248,0.1)', isDark),
              border: `1px solid ${ds('#bfdbfe', 'rgba(56,189,248,0.2)', isDark)}`,
              color: ds('#0284c7', '#7dd3fc', isDark),
            }}
          >
            {c}
          </div>
        ))}
        <div className="col-span-4 flex justify-center py-1">
          <svg className="w-5 h-5" style={{ color: ds('#94a3b8', '#475569', isDark) }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div
          className="col-span-4 rounded-lg py-3 font-bold"
          style={{
            background: ds('#f0fdf4', 'rgba(52,211,153,0.1)', isDark),
            border: `1px solid ${ds('#bbf7d0', 'rgba(52,211,153,0.2)', isDark)}`,
            color: ds('#059669', '#6ee7b7', isDark),
          }}
        >
          Single-Threaded Event Loop (processes one command at a time)
        </div>
        <div className="col-span-4 flex justify-center py-1">
          <svg className="w-5 h-5" style={{ color: ds('#94a3b8', '#475569', isDark) }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div
          className="col-span-4 rounded-lg py-3 font-bold"
          style={{
            background: ds('#f5f3ff', 'rgba(167,139,250,0.1)', isDark),
            border: `1px solid ${ds('#ddd6fe', 'rgba(167,139,250,0.2)', isDark)}`,
            color: ds('#7c3aed', '#c4b5fd', isDark),
          }}
        >
          In-Memory Data (RAM)
        </div>
      </div>
    </div>
  )
}

function PersistenceSection() {
  const isDark = useIsDark()

  const options = [
    {
      title: 'RDB Snapshots',
      color: '#d97706',
      darkColor: '#fbbf24',
      description:
        'Takes a snapshot of all cached data at regular intervals. Fast to restore, but data cached between snapshots is lost. Think of it like auto-save — you lose recent unsaved work.',
      config: 'save 60 1000',
      configNote: '# snapshot every 60s if 1000+ writes',
    },
    {
      title: 'AOF (Append Only File)',
      color: '#059669',
      darkColor: '#34d399',
      description:
        'Logs every write to a file. More durable — almost no data loss on crash. Slower to restore. Like a browser undo history where every action is recorded.',
      config: 'appendonly yes',
      configNote: '# enable AOF',
    },
  ]

  return (
    <div
      className="rounded-xl border p-6"
      style={{
        background: ds('#f8fafc', '#0f172a', isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      <h4 className="font-bold mb-4 mt-0" style={{ color: tc(theme.textPrimary, isDark) }}>
        Persistence Options
      </h4>
      <p className="text-sm leading-relaxed mb-4" style={{ color: ds('#64748b', '#94a3b8', isDark) }}>
        What if your hosting provider restarts the server? Redis has two strategies to survive restarts.
        You don&apos;t configure these as a frontend dev, but knowing they exist explains why cached data
        sometimes disappears after a deploy.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => (
          <div
            key={opt.title}
            className="rounded-lg border p-4 space-y-2"
            style={{
              background: ds('#ffffff', '#1e293b', isDark),
              borderColor: ds(opt.color + '30', opt.darkColor + '30', isDark),
            }}
          >
            <h5
              className="font-bold text-sm m-0"
              style={{ color: ds(opt.color, opt.darkColor, isDark) }}
            >
              {opt.title}
            </h5>
            <p className="text-xs leading-relaxed m-0" style={{ color: ds('#64748b', '#94a3b8', isDark) }}>
              {opt.description}
            </p>
            <div
              className="font-mono text-xs rounded p-2"
              style={{
                background: ds('#f1f5f9', '#0f172a', isDark),
                color: ds('#64748b', '#94a3b8', isDark),
              }}
            >
              {opt.config}{' '}
              <span style={{ color: ds('#94a3b8', '#475569', isDark) }}>{opt.configNote}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScalingSection() {
  const isDark = useIsDark()

  const strategies = [
    {
      num: '01',
      title: 'Replication',
      desc: 'Read replicas handle more concurrent API requests. When 10,000 users load your dashboard simultaneously, replicas prevent a bottleneck.',
    },
    {
      num: '02',
      title: 'Sentinel',
      desc: 'Automatic failover. If the Redis server goes down, a backup takes over in seconds. Your frontend never sees an error — the API just keeps responding.',
    },
    {
      num: '03',
      title: 'Cluster',
      desc: 'Splits data across multiple servers when one machine isn\'t enough. Transparent to your API code — the caching your frontend relies on stays the same.',
    },
  ]

  return (
    <div
      className="rounded-xl border p-6"
      style={{
        background: ds('#f8fafc', '#0f172a', isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      <h4 className="font-bold mb-4 mt-0" style={{ color: tc(theme.textPrimary, isDark) }}>
        Why Redis Stays Fast at Scale
      </h4>
      <div className="space-y-3">
        {strategies.map((item) => (
          <div
            key={item.num}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{ background: ds('#ffffff', '#1e293b', isDark) }}
          >
            <span
              className="font-bold font-mono text-sm shrink-0"
              style={{ color: ds('#0284c7', '#38bdf8', isDark) }}
            >
              {item.num}
            </span>
            <div>
              <h5
                className="font-semibold text-sm m-0"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {item.title}
              </h5>
              <p
                className="text-xs mt-1 m-0"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RedisArchitectureDiagram() {
  return (
    <div className="space-y-6 mb-6">
      <EventLoopSection />
      <PersistenceSection />
      <ScalingSection />
    </div>
  )
}
