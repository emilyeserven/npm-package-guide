import { TRAFFIC_STEPS } from '../../../data/coolifyData'
import type { TrafficStep } from '../../../data/coolifyData'
import { useIsDark } from '../../../hooks/useTheme'

const colorMap: Record<TrafficStep['color'], { bg: string; border: string; text: string; darkBg: string; darkBorder: string; darkText: string }> = {
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', darkBg: 'dark:bg-purple-500/10', darkBorder: 'dark:border-purple-500/30', darkText: 'dark:text-purple-300' },
  teal:   { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', darkBg: 'dark:bg-teal-500/10', darkBorder: 'dark:border-teal-500/30', darkText: 'dark:text-teal-300' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', darkBg: 'dark:bg-yellow-500/10', darkBorder: 'dark:border-yellow-500/30', darkText: 'dark:text-yellow-300' },
  blue:   { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', darkBg: 'dark:bg-blue-500/10', darkBorder: 'dark:border-blue-500/30', darkText: 'dark:text-blue-300' },
  green:  { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', darkBg: 'dark:bg-green-500/10', darkBorder: 'dark:border-green-500/30', darkText: 'dark:text-green-300' },
}

export function TrafficDiagram() {
  const isDark = useIsDark()

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6 my-6 overflow-x-auto">
      <div className="flex items-center gap-2.5 min-w-fit justify-center">
        {TRAFFIC_STEPS.map((step, i) => {
          const c = colorMap[step.color]
          return (
            <div key={step.label} className="contents">
              {i > 0 && (
                <span className={`font-mono text-base shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{'\u2192'}</span>
              )}
              <div className={`px-4 py-2.5 rounded-lg border text-center shrink-0 font-mono text-xs font-medium ${c.bg} ${c.border} ${c.text} ${c.darkBg} ${c.darkBorder} ${c.darkText}`}>
                {step.label}
                {step.sublabel && (
                  <>
                    <br />
                    <span className="text-[10px] opacity-80">({step.sublabel})</span>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
