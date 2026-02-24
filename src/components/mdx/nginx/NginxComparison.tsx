import { useIsDark } from '../../../hooks/useTheme'

const sides = [
  {
    label: 'Apache (Process-per-request)',
    items: [
      'Spawns a new thread/process per connection',
      'Each connection consumes memory',
      'Great for dynamic content with mod_php',
      'Configuration via .htaccess (per-directory)',
      'Memory usage grows linearly with connections',
    ],
  },
  {
    label: 'Nginx (Event-driven)',
    items: [
      'Single master process + worker processes',
      'Each worker handles thousands of connections',
      'Async, non-blocking I/O event loop',
      'Centralized config (no per-directory overrides)',
      'Memory usage stays flat under high load',
    ],
  },
]

export function NginxComparison() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {sides.map((side, si) => (
        <div
          key={si}
          className={`rounded-xl border p-5 ${
            si === 1
              ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/5'
              : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'
          }`}
        >
          <div
            className={`text-xs font-mono font-medium uppercase tracking-wider mb-3 ${
              si === 1
                ? 'text-emerald-700 dark:text-emerald-400'
                : isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {side.label}
          </div>
          <div className="space-y-2">
            {side.items.map((item, ii) => (
              <div
                key={ii}
                className={`text-sm leading-relaxed pl-3 border-l-2 ${
                  si === 1
                    ? 'border-emerald-200 dark:border-emerald-500/30 text-slate-700 dark:text-slate-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
