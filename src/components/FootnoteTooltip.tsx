import { useCallback } from 'react'
import { useHoverTooltip } from '../hooks/useHoverTooltip'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface FnData {
  label: string
  url: string
  source: string
  note?: string
  fnNum: string
}

const extractData = (el: HTMLElement): FnData | null => {
  const label = el.dataset.fnLabel
  if (!label) return null
  return {
    label,
    url: el.dataset.fnUrl || '',
    source: el.dataset.fnSource || '',
    note: el.dataset.fnNote || undefined,
    fnNum: el.dataset.fn || '',
  }
}

export function FootnoteTooltip() {
  const extraListeners = useCallback(
    (helpers: {
      show: (target: HTMLElement) => void
      hide: () => void
      cancelHide: () => void
      visibleIdRef: React.RefObject<string | null>
      showTimeRef: React.RefObject<number>
    }) => ({
      click: {
        handler: ((e: MouseEvent) => {
          const el = e.target as HTMLElement
          const target = el.closest?.('.fn-ref') as HTMLElement | null

          // Tapping outside footnote ref and tooltip dismisses the tooltip
          if (!target && !el.closest?.('.fn-tooltip')) {
            if (helpers.visibleIdRef.current) helpers.hide()
            return
          }
          if (!target) return

          const fnNum = target.dataset.fn || ''

          // If tooltip is already showing for this footnote (and not from the
          // same tap's synthetic mouseover), navigate to the link
          const shownByThisTap = Date.now() - helpers.showTimeRef.current < 300
          if (helpers.visibleIdRef.current === fnNum && !shownByThisTap) {
            const url = target.dataset.fnUrl
            if (url) {
              window.open(url, '_blank', 'noopener,noreferrer')
            } else {
              const fn = document.getElementById('fn-' + fnNum)
              if (fn) fn.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            return
          }

          // First tap: show tooltip instead of navigating
          e.preventDefault()
          e.stopPropagation()
          helpers.show(target)
          helpers.visibleIdRef.current = fnNum
        }) as EventListener,
        options: true as boolean, // capture phase
      },
    }),
    []
  )

  const { data, visible, style, cancelHide, scheduleHide } = useHoverTooltip<FnData>({
    selector: '.fn-ref',
    extractData,
    width: 288,
    preferAbove: true,
    tooltipClass: 'fn-tooltip',
    extraListeners,
  })

  if (!data || !style) return null

  return (
    <div
      role="tooltip"
      className="fn-tooltip absolute z-50 max-w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-3.5 py-2.5 text-sm leading-normal"
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        animation: 'fadeIn 0.12s ease-out',
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >
      <a
        className="text-blue-500 dark:text-blue-400 font-semibold no-underline inline-flex items-center gap-1 hover:underline"
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.label}
        <ExternalLinkIcon className="w-3 h-3 shrink-0 opacity-60" />
      </a>
      {data.source && <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-px rounded uppercase tracking-wide ml-1.5">{data.source}</span>}
      {data.note && <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5 mb-0">{data.note}</p>}
    </div>
  )
}
