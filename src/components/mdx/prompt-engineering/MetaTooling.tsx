import { META_TOOLS } from '../../../data/promptData'

export function MetaTooling({ toolId }: { toolId: string }) {
  const tool = META_TOOLS.find(t => t.id === toolId)
  if (!tool) return null

  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        {tool.description}
      </p>

      <ul className="list-none m-0 p-0">
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
    </div>
  )
}
