import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import {
  JCS_PIPELINE_STEPS,
  JCS_CONCEPT_CARDS,
  JCS_AST_EXAMPLES,
} from '../../../data/jscodeshiftData'

/** Horizontal pipeline diagram showing the transform flow. */
export function JcsPipeline() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-wrap items-center gap-0 my-6 overflow-x-auto py-2">
      {JCS_PIPELINE_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div
            className="rounded-lg border px-4 py-3 text-center min-w-[120px]"
            style={{
              background: ds('#f8fafc', '#1e293b', isDark),
              borderColor: ds('#e2e8f0', '#334155', isDark),
            }}
          >
            <div
              className="text-[10px] uppercase tracking-wider font-mono mb-1"
              style={{ color: ds('#94a3b8', '#64748b', isDark) }}
            >
              {step.label}
            </div>
            <div
              className="text-sm font-mono font-medium"
              style={{
                color: step.accent
                  ? ds('#3b82f6', '#60a5fa', isDark)
                  : ds('#1e293b', '#e2e8f0', isDark),
              }}
            >
              {step.value}
            </div>
          </div>
          {i < JCS_PIPELINE_STEPS.length - 1 && (
            <span
              className="px-2 text-lg flex-shrink-0"
              style={{ color: ds('#94a3b8', '#64748b', isDark) }}
            >
              &rarr;
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

/** Grid of core concept cards (AST, Collection, Transform, NodePath). */
export function JcsConceptCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {JCS_CONCEPT_CARDS.map(card => (
        <div
          key={card.id}
          className="rounded-xl border p-5 transition-all hover:-translate-y-0.5"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderColor: ds('#e2e8f0', '#334155', isDark),
          }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base mb-3"
            style={{
              background: ds(card.iconBg, card.iconDarkBg, isDark),
              color: ds(card.iconColor, card.iconDarkColor, isDark),
            }}
          >
            {card.icon}
          </div>
          <h4
            className="font-mono text-sm font-medium mb-2"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {card.title}
          </h4>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
            dangerouslySetInnerHTML={{ __html: card.body }}
          />
        </div>
      ))}
    </div>
  )
}

/** Interactive AST Explorer demo that cycles through examples. */
export function JcsAstDemo() {
  const isDark = useIsDark()
  const [index, setIndex] = useState(0)
  const example = JCS_AST_EXAMPLES[index]

  return (
    <div
      className="rounded-xl border overflow-hidden my-6"
      style={{
        background: ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
      }}
    >
      <div
        className="flex justify-between items-center px-5 py-3 border-b"
        style={{ borderColor: ds('#e2e8f0', '#334155', isDark) }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-wider"
          style={{ color: ds('#94a3b8', '#64748b', isDark) }}
        >
          AST Visualization
        </span>
        <button
          onClick={() => setIndex((index + 1) % JCS_AST_EXAMPLES.length)}
          className="rounded-md border px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors"
          style={{
            background: ds('#3b82f6', '#2563eb', isDark),
            borderColor: ds('#3b82f6', '#3b82f6', isDark),
            color: '#fff',
          }}
        >
          Next Example &rsaquo;
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[200px]">
        <div
          className="p-5 md:border-r"
          style={{ borderColor: ds('#e2e8f0', '#334155', isDark) }}
        >
          <span
            className="block font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: ds('#94a3b8', '#64748b', isDark) }}
          >
            Source Code
          </span>
          <pre
            className="font-mono text-xs leading-relaxed whitespace-pre-wrap m-0"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {example.source}
          </pre>
        </div>
        <div className="p-5">
          <span
            className="block font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: ds('#94a3b8', '#64748b', isDark) }}
          >
            AST Nodes (Simplified)
          </span>
          <pre
            className="font-mono text-xs leading-relaxed whitespace-pre-wrap m-0"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {example.tree}
          </pre>
        </div>
      </div>
    </div>
  )
}
