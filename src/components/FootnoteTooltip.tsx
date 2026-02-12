import { useState, useEffect, useRef, useCallback } from 'react'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface FnTooltipData {
  label: string
  url: string
  source: string
  note?: string
  fnNum: string
  rect: DOMRect
}

export function FootnoteTooltip() {
  const [data, setData] = useState<FnTooltipData | null>(null)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visibleFnRef = useRef<string | null>(null)
  const showTimeRef = useRef(0)

  const cancelHide = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  const scheduleHide = useCallback(() => {
    cancelHide()
    hideTimer.current = setTimeout(() => {
      setVisible(false)
      visibleFnRef.current = null
      setTimeout(() => setData(null), 150)
    }, 150)
  }, [cancelHide])

  const hide = useCallback(() => {
    cancelHide()
    setVisible(false)
    visibleFnRef.current = null
    setTimeout(() => setData(null), 150)
  }, [cancelHide])

  useEffect(() => {
    function showTooltip(target: HTMLElement) {
      cancelHide()
      const label = target.dataset.fnLabel
      const url = target.dataset.fnUrl
      if (!label) return

      const fnNum = target.dataset.fn || ''
      const rect = target.getBoundingClientRect()
      setData({
        label,
        url: url || '',
        source: target.dataset.fnSource || '',
        note: target.dataset.fnNote || undefined,
        fnNum,
        rect,
      })
      visibleFnRef.current = fnNum
      showTimeRef.current = Date.now()
      requestAnimationFrame(() => setVisible(true))
    }

    function onMouseOver(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest?.('.fn-ref') as HTMLElement | null
      if (!target) return
      showTooltip(target)
    }

    function onMouseOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null
      if (related?.closest?.('.fn-tooltip') || related?.closest?.('.fn-ref')) return
      scheduleHide()
    }

    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement
      const target = el.closest?.('.fn-ref') as HTMLElement | null

      // Tapping outside footnote ref and tooltip dismisses the tooltip
      if (!target && !el.closest?.('.fn-tooltip')) {
        if (visibleFnRef.current) hide()
        return
      }
      if (!target) return

      const fnNum = target.dataset.fn || ''

      // If tooltip is already showing for this footnote (and not from the
      // same tap's synthetic mouseover), navigate to the link
      const shownByThisTap = Date.now() - showTimeRef.current < 300
      if (visibleFnRef.current === fnNum && !shownByThisTap) {
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
      showTooltip(target)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') hide()
    }

    function onScroll() {
      hide()
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('click', onClick, true)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
      cancelHide()
    }
  }, [cancelHide, scheduleHide, hide])

  if (!data) return null

  // Position above the footnote ref (fixed positioning, no scroll offset needed)
  const { rect } = data
  const tooltipWidth = 288 // max-w-72 = 18rem = 288px
  let left = rect.left + rect.width / 2 - tooltipWidth / 2
  if (left < 8) left = 8
  if (left + tooltipWidth > window.innerWidth - 8) left = window.innerWidth - 8 - tooltipWidth

  // Show below if not enough space above
  const spaceAbove = rect.top
  const showBelow = spaceAbove < 120
  const top = showBelow ? rect.bottom + 6 : rect.top - 6

  return (
    <div
      className="fn-tooltip"
      style={{
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        transform: showBelow ? undefined : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >
      <a
        className="fn-tooltip-link"
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.label}
        <ExternalLinkIcon className="fn-tooltip-ext" />
      </a>
      {data.source && <span className="fn-tooltip-source">{data.source}</span>}
      {data.note && <p className="fn-tooltip-note">{data.note}</p>}
    </div>
  )
}
