import { CONTEXT_TECHNIQUES } from '../../../data/promptData'

export function TechniqueDetail({ techniqueId }: { techniqueId: string }) {
  const technique = CONTEXT_TECHNIQUES.find(t => t.id === techniqueId)
  if (!technique) return null

  return (
    <div>
      {/* Details list */}
      <ul className="list-none m-0 p-0 mb-5">
        {technique.details.map((detail, i) => (
          <li
            key={i}
            className="text-sm text-slate-800 dark:text-slate-300 py-1 flex gap-2 leading-relaxed"
          >
            <span className="text-cyan-500 dark:text-cyan-400 shrink-0">{'\u2192'}</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {/* Code example */}
      <div className="bg-slate-800 dark:bg-gray-950 text-slate-200 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
        {technique.example}
      </div>
    </div>
  )
}
