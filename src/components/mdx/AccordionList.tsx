import { type ReactNode } from 'react'
import { useAccordion } from '../../hooks/useAccordion'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

export interface AccordionListProps<T> {
  items: T[]
  /** Renders the always-visible header row for each item */
  renderHeader: (item: T, index: number, isDark: boolean) => ReactNode
  /** Renders the collapsible body content for each item */
  renderBody: (item: T, index: number, isDark: boolean) => ReactNode
  /** Optional heading above the list */
  heading?: ReactNode
  /** Tailwind gap class between items (default: "gap-2") */
  gap?: string
  /** Additional classes on the outer container */
  className?: string
  /** Per-item container classes (default: rounded-xl bordered card) */
  itemClassName?: string
  /** Per-item inline style (receives isDark and expanded state) */
  itemStyle?: (item: T, isDark: boolean, expanded: boolean) => React.CSSProperties
  /** Expand/collapse indicator style. Defaults to a rotating "+" */
  renderIndicator?: (expanded: boolean, isDark: boolean) => ReactNode
  /** Use <button> for the clickable row (default: true, better a11y) */
  useButton?: boolean
}

function DefaultIndicator({ expanded, isDark }: { expanded: boolean; isDark: boolean }) {
  return (
    <span
      className="text-lg transition-transform duration-200 shrink-0"
      style={{
        color: ds('#94a3b8', '#64748b', isDark),
        transform: expanded ? 'rotate(45deg)' : 'none',
      }}
    >
      +
    </span>
  )
}

export function AccordionList<T>({
  items,
  renderHeader,
  renderBody,
  heading,
  gap = 'gap-2',
  className = '',
  itemClassName = 'rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-4',
  itemStyle,
  renderIndicator,
  useButton = true,
}: AccordionListProps<T>) {
  const { toggle, isExpanded } = useAccordion()
  const isDark = useIsDark()

  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {heading}
      {items.map((item, i) => {
        const expanded = isExpanded(i)
        const Tag = useButton ? 'button' : 'div'
        return (
          <Tag
            key={i}
            onClick={() => toggle(i)}
            className={`${itemClassName} cursor-pointer transition-all duration-150 ${useButton ? 'w-full text-left border-none' : ''}`}
            style={itemStyle?.(item, isDark, expanded)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                {renderHeader(item, i, isDark)}
              </div>
              {renderIndicator
                ? renderIndicator(expanded, isDark)
                : <DefaultIndicator expanded={expanded} isDark={isDark} />}
            </div>
            {expanded && renderBody(item, i, isDark)}
          </Tag>
        )
      })}
    </div>
  )
}
