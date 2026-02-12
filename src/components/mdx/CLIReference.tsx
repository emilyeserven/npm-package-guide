import { useState } from 'react'
import { CLI_GROUPS } from '../../data/promptData'

export function CLIReference() {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set())

  const toggle = (idx: number) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {CLI_GROUPS.map((group, idx) => {
        const expanded = expandedGroups.has(idx)
        return (
          <div key={idx}>
            <button
              onClick={() => toggle(idx)}
              className={`w-full py-3.5 px-5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-pointer text-slate-900 dark:text-slate-100 text-sm font-semibold transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-800 ${expanded ? 'rounded-t-xl border-b-0' : 'rounded-xl'}`}
            >
              {group.name}
              <span
                className="text-xs text-slate-400 transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
              >
                {'\u25BC'}
              </span>
            </button>
            {expanded && (
              <div className="bg-slate-50 dark:bg-slate-900/60 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-xl overflow-hidden">
                {group.commands.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-3 px-5 ${i < group.commands.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                  >
                    <code className="text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded shrink-0 max-w-[55%] overflow-x-auto block whitespace-nowrap">
                      {c.cmd}
                    </code>
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                        {c.desc}
                      </span>
                      {!c.human && (
                        <span className="text-[10px] px-1.5 py-px rounded bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-semibold whitespace-nowrap shrink-0">
                          AI fav
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
