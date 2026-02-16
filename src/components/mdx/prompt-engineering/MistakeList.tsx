import { MISTAKE_CATEGORIES } from '../../../data/promptData'
import { MistakeItemCard } from '../MistakeItem'

export function MistakeList({ categoryId }: { categoryId: string }) {
  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  return (
    <div className="flex flex-col gap-5">
      {category.items.map(item => (
        <div key={item.id} id={item.id} className="first:mt-0 mt-5">
          <MistakeItemCard item={item} />
        </div>
      ))}
    </div>
  )
}
