import { useState, useCallback } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { LB_STRATEGIES, LB_SERVERS } from '../../../data/nginxData'

export function NginxLoadBalancingDemo() {
  const isDark = useIsDark()
  const [strategy, setStrategy] = useState('round-robin')
  const [nextRR, setNextRR] = useState(0)
  const [serverLoad, setServerLoad] = useState([0, 0, 0])

  const sendRequest = useCallback(() => {
    setServerLoad(prev => {
      let target: number
      if (strategy === 'round-robin') {
        target = nextRR % 3
        setNextRR(n => n + 1)
      } else if (strategy === 'least-conn') {
        target = prev.indexOf(Math.min(...prev))
      } else {
        const weights = [3, 1, 1]
        const total = weights.reduce((a, b) => a + b, 0)
        let r = Math.random() * total
        target = 0
        for (let i = 0; i < weights.length; i++) {
          r -= weights[i]
          if (r <= 0) { target = i; break }
        }
      }
      const next = [...prev]
      next[target]++
      return next
    })
  }, [strategy, nextRR])

  const reset = () => {
    setServerLoad([0, 0, 0])
    setNextRR(0)
  }

  const maxLoad = Math.max(...serverLoad, 1)

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5">
      {/* Strategy selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {LB_STRATEGIES.map(s => (
          <button
            key={s.id}
            onClick={() => { setStrategy(s.id); reset() }}
            className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-colors cursor-pointer ${
              strategy === s.id
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40'
                : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Server bars */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {LB_SERVERS.map((name, i) => (
          <div
            key={name}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-3 text-center"
          >
            <div className={`text-[10px] uppercase tracking-wider font-medium mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {name}
              {strategy === 'weighted' && (
                <span className="text-emerald-600 dark:text-emerald-400"> &times;{[3, 1, 1][i]}</span>
              )}
            </div>
            <div className="h-14 flex items-end justify-center">
              <div
                className="w-3/5 rounded-t transition-all duration-300"
                style={{
                  height: `${(serverLoad[i] / maxLoad) * 100}%`,
                  minHeight: serverLoad[i] > 0 ? 4 : 0,
                  background: isDark
                    ? 'linear-gradient(to top, rgba(52,211,153,0.3), rgba(52,211,153,0.6))'
                    : 'linear-gradient(to top, rgba(5,150,105,0.2), rgba(5,150,105,0.5))',
                }}
              />
            </div>
            <div className="font-mono text-lg font-semibold text-emerald-700 dark:text-emerald-400 mt-1.5">
              {serverLoad[i]}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={sendRequest}
          className="px-4 py-2 rounded-lg font-mono text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          &#9654; Send Request
        </button>
        <button
          onClick={() => { for (let i = 0; i < 10; i++) setTimeout(sendRequest, i * 80) }}
          className="px-4 py-2 rounded-lg font-mono text-xs border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          &#9654;&#9654; Send 10
        </button>
        <button
          onClick={reset}
          className={`px-3 py-2 rounded-lg font-mono text-xs border transition-colors cursor-pointer ${
            isDark ? 'border-slate-700 text-slate-500 hover:bg-slate-800' : 'border-slate-200 text-slate-400 hover:bg-slate-100'
          }`}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
