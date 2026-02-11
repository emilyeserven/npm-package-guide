import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { getNavTitle } from '../data/navigation'

interface TooltipData {
  term: string
  def: string
  url: string
  source: string
  sectionId?: string
  rect: DOMRect
}

const externalLinkSvg = `<svg class="w-3 h-3 align-middle shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`

export function GlossaryTooltip() {
  const [data, setData] = useState<TooltipData | null>(null)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
      // Wait for fade-out transition before clearing data
      setTimeout(() => setData(null), 150)
    }, 150)
  }, [cancelHide])

  const hide = useCallback(() => {
    cancelHide()
    setVisible(false)
    setTimeout(() => setData(null), 150)
  }, [cancelHide])

  useEffect(() => {
    function onMouseOver(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest?.('.glossary-term') as HTMLElement | null
      if (!target) return

      cancelHide()

      const rect = target.getBoundingClientRect()
      setData({
        term: target.dataset.glossaryTerm || '',
        def: target.dataset.glossaryDef || '',
        url: target.dataset.glossaryUrl || '',
        source: target.dataset.glossarySource || '',
        sectionId: target.dataset.glossarySection || undefined,
        rect,
      })
      // Show after a microtask so the element is positioned before fading in
      requestAnimationFrame(() => setVisible(true))
    }

    function onMouseOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null
      // If moving to the tooltip itself or another glossary-term, don't hide
      if (related?.closest?.('.gt-tooltip') || related?.closest?.('.glossary-term')) return
      scheduleHide()
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') hide()
    }

    function onScroll() {
      hide()
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
      cancelHide()
    }
  }, [cancelHide, scheduleHide, hide])

  if (!data) return null

  // Position: below the term, centered horizontally
  const { rect } = data
  const tooltipWidth = 340
  let left = rect.left + rect.width / 2 - tooltipWidth / 2
  // Clamp to viewport
  if (left < 8) left = 8
  if (left + tooltipWidth > window.innerWidth - 8) left = window.innerWidth - 8 - tooltipWidth

  // Show above if near bottom of viewport
  const spaceBelow = window.innerHeight - rect.bottom
  const showAbove = spaceBelow < 200
  const top = showAbove ? rect.top + window.scrollY - 8 : rect.bottom + window.scrollY + 8

  return (
    <div
      ref={tooltipRef}
      className={clsx(
        'gt-tooltip absolute z-[1200] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg text-[13px] leading-relaxed text-slate-800 dark:text-slate-300 transition-[opacity,transform] duration-150',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-1 pointer-events-none'
      )}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${tooltipWidth}px`,
        transform: showAbove ? 'translateY(-100%)' : undefined,
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >
      <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{data.term}</div>
      <div className="text-slate-700 dark:text-slate-300 mb-2">{data.def}</div>
      <div className="flex items-center gap-2.5 flex-wrap">
        <a
          className="inline-flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 no-underline font-medium hover:underline"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: `${data.source} docs ${externalLinkSvg}` }}
        />
        {data.sectionId && (
          <button
            className="inline-flex items-center text-xs text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-none rounded-full px-2.5 py-0.5 cursor-pointer font-medium whitespace-nowrap hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors duration-150"
            onClick={() => {
              hide()
              navigate({ to: '/$sectionId', params: { sectionId: data.sectionId! } })
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            → {getNavTitle(data.sectionId)}
          </button>
        )}
      </div>
    </div>
  )
}
