import { useNavigate } from '@tanstack/react-router'
import { getNavOrder, getNavTitle } from '../data/navigation'

export function PrevNextNav({ currentId }: { currentId: string }) {
  const navigate = useNavigate()
  const order = getNavOrder()
  const idx = order.indexOf(currentId)

  const handleNav = (id: string) => {
    if (id === 'roadmap') {
      navigate({ to: '/' })
    } else {
      navigate({ to: '/$sectionId', params: { sectionId: id } })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex gap-3 mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
      {idx > 0 && (
        <button
          className="flex items-center gap-2 flex-1 min-w-0 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-left cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]"
          onClick={() => handleNav(order[idx - 1])}
        >
          <span className="text-blue-500 dark:text-blue-400 text-lg font-medium shrink-0">&larr;</span>
          <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap">{getNavTitle(order[idx - 1]).replace(/^\S+\s+/, '')}</span>
        </button>
      )}
      {idx < order.length - 1 && (
        <button
          className="flex items-center justify-end gap-2 flex-1 min-w-0 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-right cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] ml-auto"
          onClick={() => handleNav(order[idx + 1])}
        >
          <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap">{getNavTitle(order[idx + 1]).replace(/^\S+\s+/, '')}</span>
          <span className="text-blue-500 dark:text-blue-400 text-lg font-medium shrink-0">&rarr;</span>
        </button>
      )}
    </div>
  )
}
