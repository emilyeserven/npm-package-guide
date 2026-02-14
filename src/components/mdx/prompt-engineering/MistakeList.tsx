import { MISTAKE_CATEGORIES } from '../../../data/promptData'
import { parseInlineCode } from '../../../helpers/inlineCode'

export function MistakeList({ categoryId }: { categoryId: string }) {
  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  return (
    <div className="flex flex-col gap-5">
      {category.items.map(item => (
        <div key={item.id}>
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2 mt-0" id={item.id}>
            {item.mistake}
          </h3>
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            {parseInlineCode(item.example)}
          </div>
          <div className="text-sm text-blue-600 dark:text-cyan-400 flex gap-1.5 items-start">
            <span className="shrink-0">{'\u{1F4A1}'}</span>
            <span>{item.fix}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
