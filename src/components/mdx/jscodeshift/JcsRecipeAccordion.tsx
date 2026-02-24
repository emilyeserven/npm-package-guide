import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AccordionList } from '../AccordionList'
import { JCS_RECIPES } from '../../../data/jscodeshiftData'
import type { JcsRecipe } from '../../../data/jscodeshiftData'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const isDark = useIsDark()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="px-2 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer"
      style={{
        background: copied
          ? ds('#dcfce7', '#14532d', isDark)
          : ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
        color: copied
          ? ds('#15803d', '#86efac', isDark)
          : ds('#94a3b8', '#64748b', isDark),
      }}
    >
      {copied ? '\u2713 copied' : 'copy'}
    </button>
  )
}

/** Accordion list of real-world codemod recipes. */
export function JcsRecipeAccordion() {
  const isDark = useIsDark()

  return (
    <AccordionList<JcsRecipe>
      items={JCS_RECIPES}
      renderHeader={(recipe) => (
        <span className="font-mono text-xs font-medium">
          {recipe.title}
        </span>
      )}
      renderBody={(recipe) => (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <CopyButton text={recipe.code} />
            </div>
            <pre
              className="rounded-lg border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
              style={{
                background: ds('#f8fafc', '#0f172a', isDark),
                borderColor: ds('#e2e8f0', '#1e293b', isDark),
                color: ds('#334155', '#cbd5e1', isDark),
              }}
            >
              {recipe.code}
            </pre>
          </div>
          {recipe.caveat && (
            <div
              className="rounded-lg border-l-3 pl-4 py-3 text-sm"
              style={{
                borderColor: ds('#f59e0b', '#fbbf24', isDark),
                background: ds('rgba(251,191,36,0.05)', 'rgba(251,191,36,0.05)', isDark),
                color: ds('#92400e', '#fcd34d', isDark),
              }}
            >
              <span
                className="block font-mono text-[10px] uppercase tracking-wider mb-1 font-semibold"
                style={{ color: ds('#d97706', '#fbbf24', isDark) }}
              >
                Caveat
              </span>
              <span
                className="text-sm leading-relaxed"
                style={{ color: ds('#78350f', '#fde68a', isDark) }}
                dangerouslySetInnerHTML={{ __html: recipe.caveat }}
              />
            </div>
          )}
        </div>
      )}
      renderIndicator={(expanded, isDark) => (
        <span
          className="text-xs transition-transform"
          style={{
            color: ds('#94a3b8', '#64748b', isDark),
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          &#9660;
        </span>
      )}
    />
  )
}
