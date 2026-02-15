import { MISTAKE_CATEGORIES } from '../../../data/promptData'
import { parseInlineCode } from '../../../helpers/inlineCode'

export function MistakeList({ categoryId }: { categoryId: string }) {
  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  return (
    <div className="flex flex-col gap-5">
      {category.items.map(item => (
        <div key={item.id}>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2 first:mt-0" id={item.id}>
            {item.mistake}
          </h2>
          <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">
            {parseInlineCode(item.example)}
          </div>
          <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed flex gap-1.5 items-start">
            <span className="shrink-0">{'\u{1F4A1}'}</span>
            <span>{item.fix}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
