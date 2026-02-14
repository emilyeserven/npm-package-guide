import { type ReactNode } from 'react'

interface ChecklistProgressProps {
  checked: number
  total: number
  /** Custom label node. Pass `null` to hide the label entirely. When omitted, displays "checked/total". */
  label?: ReactNode | null
  /** Tailwind classes for the fill bar color. Default: "bg-blue-500 dark:bg-blue-400" */
  barColorClass?: string
  /** Tailwind classes for the track background. Default: "bg-slate-100 dark:bg-slate-800" */
  trackColorClass?: string
  /** Additional classes on the outer container */
  className?: string
}

export function ChecklistProgress({
  checked,
  total,
  label,
  barColorClass = 'bg-blue-500 dark:bg-blue-400',
  trackColorClass = 'bg-slate-100 dark:bg-slate-800',
  className = '',
}: ChecklistProgressProps) {
  const pct = total > 0 ? (checked / total) * 100 : 0

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 h-2 ${trackColorClass} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${barColorClass} rounded-full transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {label !== null && (
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap tabular-nums">
          {label ?? `${checked}/${total}`}
        </span>
      )}
    </div>
  )
}
