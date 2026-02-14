import { type ReactNode } from 'react'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

export interface TimelineFlowProps<T> {
  items: T[]
  /** Renders the circle indicator for each step */
  renderIndicator: (item: T, index: number, isDark: boolean) => ReactNode
  /** Renders the content card/body for each step */
  renderContent: (item: T, index: number, isDark: boolean) => ReactNode
  /** Renders the vertical connector between two consecutive steps.
   *  When omitted, a default solid slate line is used. */
  renderConnector?: (current: T, next: T, isDark: boolean) => ReactNode
  /** Optional heading above the timeline */
  heading?: ReactNode
  /** Optional footer below the timeline */
  footer?: ReactNode
  /** Tailwind gap class between steps (default: "gap-3") */
  gap?: string
  /** Tailwind gap class between indicator and content columns (default: "gap-3") */
  itemGap?: string
  /** Additional classes on the outer container */
  className?: string
}

function DefaultConnector({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="w-0.5 grow min-h-4"
      style={{ background: ds('#e2e8f0', '#334155', isDark) }}
    />
  )
}

export function TimelineFlow<T>({
  items,
  renderIndicator,
  renderContent,
  renderConnector,
  heading,
  footer,
  gap = 'gap-3',
  itemGap = 'gap-3',
  className = '',
}: TimelineFlowProps<T>) {
  const isDark = useIsDark()

  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {heading}

      {items.map((item, i) => (
        <div key={i} className={`flex items-stretch ${itemGap}`}>
          {/* Indicator column */}
          <div className="flex flex-col items-center shrink-0">
            {renderIndicator(item, i, isDark)}
            {i < items.length - 1 &&
              (renderConnector
                ? renderConnector(item, items[i + 1], isDark)
                : <DefaultConnector isDark={isDark} />)}
          </div>

          {/* Content column */}
          {renderContent(item, i, isDark)}
        </div>
      ))}

      {footer}
    </div>
  )
}
