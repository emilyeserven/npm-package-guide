import { TOOL_TECHNIQUES } from '../../../data/promptData'

type ToolSection = 'overview' | 'bestFor' | 'implementation' | 'examples' | 'tips' | 'proscons'

export function ToolDetail({ toolId, section }: { toolId: string; section?: ToolSection }) {
  const tool = TOOL_TECHNIQUES.find(t => t.id === toolId)
  if (!tool) return null

  const showAll = !section

  return (
    <div>
      {/* Overview (existing details bullets) */}
      {(showAll || section === 'overview') && (
        <ul className="list-none m-0 p-0 mb-5">
          {tool.details.map((detail, i) => (
            <li
              key={i}
              className="text-sm text-slate-800 dark:text-slate-300 py-1 flex gap-2 leading-relaxed"
            >
              <span className="text-cyan-500 dark:text-cyan-400 shrink-0">{'\u2192'}</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Best For */}
      {(showAll || section === 'bestFor') && tool.bestFor && tool.bestFor.length > 0 && (
        <div className="mb-5">
          {section === 'bestFor' && (
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Best used for</h4>
          )}
          <ul className="list-none m-0 p-0">
            {tool.bestFor.map((item, i) => (
              <li
                key={i}
                className="text-sm text-slate-800 dark:text-slate-300 py-1 flex gap-2 leading-relaxed"
              >
                <span className="text-emerald-500 dark:text-emerald-400 shrink-0">{'\u2713'}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Implementation Steps */}
      {(showAll || section === 'implementation') && tool.implementation && tool.implementation.length > 0 && (
        <div className="mb-5 space-y-4">
          {tool.implementation.map((step, i) => (
            <div key={i}>
              <div className="flex gap-2 items-baseline mb-1">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {step.title}
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 ml-7 mb-2 leading-relaxed">
                {step.description}
              </p>
              {step.code && (
                <div className="ml-7 bg-slate-800 dark:bg-gray-950 text-slate-200 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
                  {step.code}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Examples */}
      {(showAll || section === 'examples') && tool.examples && tool.examples.length > 0 && (
        <div className="mb-5 space-y-4">
          {tool.examples.map((ex, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {ex.title}
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-slate-200 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
                {ex.code}
              </div>
              {ex.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {ex.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pros & Cons */}
      {(showAll || section === 'proscons') && tool.pros && tool.cons && (tool.pros.length > 0 || tool.cons.length > 0) && (
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.pros && tool.pros.length > 0 && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <span>{'\u2705'}</span> Pros
              </h4>
              <ul className="list-none m-0 p-0">
                {tool.pros.map((pro, i) => (
                  <li
                    key={i}
                    className="text-sm text-emerald-900 dark:text-emerald-200 py-1 flex gap-2 leading-relaxed"
                  >
                    <span className="text-emerald-500 dark:text-emerald-400 shrink-0">{'\u002B'}</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tool.cons && tool.cons.length > 0 && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-1.5">
                <span>{'\u26A0\uFE0F'}</span> Cons
              </h4>
              <ul className="list-none m-0 p-0">
                {tool.cons.map((con, i) => (
                  <li
                    key={i}
                    className="text-sm text-red-900 dark:text-red-200 py-1 flex gap-2 leading-relaxed"
                  >
                    <span className="text-red-500 dark:text-red-400 shrink-0">{'\u2212'}</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {(showAll || section === 'tips') && tool.tips && tool.tips.length > 0 && (
        <div className="mb-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5">
            <span>{'\u{1F4A1}'}</span> Tips
          </h4>
          <ul className="list-none m-0 p-0">
            {tool.tips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-amber-900 dark:text-amber-200 py-1 flex gap-2 leading-relaxed"
              >
                <span className="text-amber-500 dark:text-amber-400 shrink-0">{'\u2022'}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
