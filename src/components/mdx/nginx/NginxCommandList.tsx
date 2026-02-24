import { useIsDark } from '../../../hooks/useTheme'
import { NGINX_COMMANDS } from '../../../data/nginxData'

export function NginxCommandList() {
  const isDark = useIsDark()

  return (
    <div className="my-6 space-y-0.5">
      {NGINX_COMMANDS.map((c, i) => (
        <div
          key={i}
          className={`px-4 py-3 rounded-md ${
            i % 2 === 0
              ? 'bg-slate-50 dark:bg-slate-800/40'
              : 'bg-transparent'
          }`}
        >
          <code
            className={`font-mono text-xs block mb-1 ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}
          >
            $ {c.cmd}
          </code>
          <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {c.desc}
          </span>
        </div>
      ))}
    </div>
  )
}
