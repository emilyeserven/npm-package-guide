import { useState, useRef, useCallback, useEffect } from 'react'

export interface TooltipPosition {
  left: string
  top: string
  position: 'fixed'
  transform?: string
}

export interface UseHoverTooltipConfig<T> {
  /** CSS selector for trigger elements (e.g. '.glossary-term') */
  selector: string
  /** Extract tooltip data from the hovered element. Return null to skip. */
  extractData: (el: HTMLElement) => T | null
  /** Tooltip width in pixels (used for horizontal clamping) */
  width: number
  /** If true, prefer showing above the trigger. Default: false (show below). */
  preferAbove?: boolean
  /** Minimum viewport space (px) needed in the preferred direction before flipping. Default: 200 for below, 120 for above. */
  flipThreshold?: number
  /** CSS class on the tooltip container (used to detect mouseout into tooltip) */
  tooltipClass: string
  /** Additional event handlers (e.g. click for tap-to-show on mobile) */
  extraListeners?: (helpers: {
    show: (target: HTMLElement) => void
    hide: () => void
    cancelHide: () => void
    visibleIdRef: React.RefObject<string | null>
    showTimeRef: React.RefObject<number>
  }) => Record<string, { handler: EventListener; options?: AddEventListenerOptions | boolean; target?: EventTarget }>
}

export interface UseHoverTooltipResult<T> {
  data: T | null
  visible: boolean
  style: TooltipPosition | null
  cancelHide: () => void
  scheduleHide: () => void
  hide: () => void
  flipped: boolean
}

export function useHoverTooltip<T>(config: UseHoverTooltipConfig<T>): UseHoverTooltipResult<T> {
  const { selector, extractData, width, preferAbove = false, flipThreshold, tooltipClass, extraListeners } = config

  const [data, setData] = useState<T | null>(null)
  const [visible, setVisible] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [style, setStyle] = useState<TooltipPosition | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visibleIdRef = useRef<string | null>(null)
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
      visibleIdRef.current = null
      setTimeout(() => {
        setData(null)
        setStyle(null)
      }, 150)
    }, 150)
  }, [cancelHide])

  const hide = useCallback(() => {
    cancelHide()
    setVisible(false)
    visibleIdRef.current = null
    setTimeout(() => {
      setData(null)
      setStyle(null)
    }, 150)
  }, [cancelHide])

  const show = useCallback((target: HTMLElement) => {
    cancelHide()
    const extracted = extractData(target)
    if (!extracted) return

    const rect = target.getBoundingClientRect()

    // Horizontal centering + viewport clamping
    let left = rect.left + rect.width / 2 - width / 2
    if (left < 8) left = 8
    if (left + width > window.innerWidth - 8) left = window.innerWidth - 8 - width

    // Vertical flip logic
    const defaultThreshold = preferAbove ? 120 : 200
    const threshold = flipThreshold ?? defaultThreshold
    const shouldFlip = preferAbove
      ? rect.top < threshold                          // preferAbove but not enough space → show below
      : window.innerHeight - rect.bottom < threshold  // preferBelow but not enough space → show above

    const top = preferAbove
      ? (shouldFlip ? rect.bottom + 6 : rect.top - 6)
      : (shouldFlip ? rect.top - 8 : rect.bottom + 8)

    const needsTranslateUp = preferAbove ? !shouldFlip : shouldFlip

    setData(extracted)
    setFlipped(shouldFlip)
    setStyle({
      left: `${left}px`,
      top: `${top}px`,
      position: 'fixed',
      transform: needsTranslateUp ? 'translateY(-100%)' : undefined,
    })

    showTimeRef.current = Date.now()
    requestAnimationFrame(() => setVisible(true))
  }, [cancelHide, extractData, width, preferAbove, flipThreshold])

  useEffect(() => {
    function onMouseOver(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest?.(selector) as HTMLElement | null
      if (!target) return
      show(target)
    }

    function onMouseOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null
      if (related?.closest?.(`.${tooltipClass}`) || related?.closest?.(selector)) return
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

    // Register extra listeners
    const extras = extraListeners?.({ show, hide, cancelHide, visibleIdRef, showTimeRef }) ?? {}
    const cleanups: (() => void)[] = []
    for (const [event, { handler, options, target }] of Object.entries(extras)) {
      const el = target ?? document
      el.addEventListener(event, handler, options)
      cleanups.push(() => el.removeEventListener(event, handler, options))
    }

    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
      cancelHide()
      cleanups.forEach(fn => fn())
    }
  }, [selector, tooltipClass, show, scheduleHide, hide, cancelHide, extraListeners])

  return { data, visible, style, cancelHide, scheduleHide, hide, flipped }
}
