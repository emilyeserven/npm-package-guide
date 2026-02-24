import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { NGINX_LOCATIONS, NGINX_TEST_URLS } from '../../../data/nginxData'

export function NginxLocationDemo() {
  const isDark = useIsDark()
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

  const selected = NGINX_TEST_URLS.find(u => u.url === selectedUrl)

  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {NGINX_TEST_URLS.map((t) => (
          <button
            key={t.url}
            onClick={() => setSelectedUrl(t.url === selectedUrl ? null : t.url)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-colors cursor-pointer ${
              selectedUrl === t.url
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:border-slate-600'
            }`}
          >
            {t.url}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {NGINX_LOCATIONS.map((loc, i) => {
          const isMatch = selected != null && selected.matchIndex === i
          return (
            <div
              key={i}
              className={`px-3.5 py-2.5 rounded-lg border flex justify-between items-center transition-colors ${
                isMatch
                  ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30'
                  : 'bg-slate-50/50 border-slate-100 dark:bg-slate-800/30 dark:border-slate-800'
              }`}
            >
              <span
                className={`font-mono text-xs ${
                  isMatch
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : isDark ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                location {loc.pattern} {'{ ... }'}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider font-medium ${
                  isMatch
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isDark ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {isMatch ? '\u2713 MATCHED' : loc.type}
              </span>
            </div>
          )
        })}
      </div>

      {selected && (
        <div className="mt-3 px-3.5 py-2.5 bg-emerald-50 dark:bg-emerald-500/5 border-l-3 border-emerald-400 dark:border-emerald-500 rounded-r-lg text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong className="text-emerald-700 dark:text-emerald-400">Why?</strong>{' '}
          {selected.reason}
        </div>
      )}
    </div>
  )
}
