import { useRef, useEffect } from 'react'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface HtmlContentProps {
  html: string
  className?: string
  as?: keyof HTMLElementTagNameMap
}

export function HtmlContent({ html, className, as: Tag = 'div' }: HtmlContentProps) {
  const ref = useRef<HTMLElement>(null)
  const navigateToSection = useNavigateToSection()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Inline nav links (buttons embedded in HTML strings)
    el.querySelectorAll<HTMLButtonElement>('.inline-nav-link, .inline-nav-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const navTarget = btn.dataset.nav
        if (navTarget) {
          navigateToSection(navTarget)
        }
      })
    })

    // Footnote references — tooltip on hover, open URL on click
    let activeTooltip: HTMLElement | null = null
    let activeFnRef: HTMLElement | null = null

    const removeTooltip = () => {
      if (activeTooltip) {
        activeTooltip.remove()
        activeTooltip = null
        activeFnRef = null
      }
    }

    el.querySelectorAll<HTMLElement>('.fn-ref').forEach(fnRef => {
      fnRef.style.cursor = 'pointer'

      fnRef.addEventListener('mouseenter', () => {
        removeTooltip()
        const label = fnRef.dataset.fnLabel
        const url = fnRef.dataset.fnUrl
        if (!label) return

        const note = fnRef.dataset.fnNote
        const source = fnRef.dataset.fnSource

        const tip = document.createElement('div')
        tip.className = 'fn-tooltip'

        let inner = `<a class="fn-tooltip-link" href="${url}" target="_blank" rel="noopener noreferrer">${label}<svg class="fn-tooltip-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`
        if (source) inner += `<span class="fn-tooltip-source">${source}</span>`
        if (note) inner += `<p class="fn-tooltip-note">${note}</p>`
        tip.innerHTML = inner

        document.body.appendChild(tip)
        activeTooltip = tip
        activeFnRef = fnRef

        // Position the tooltip above the footnote ref
        const rect = fnRef.getBoundingClientRect()
        const tipRect = tip.getBoundingClientRect()
        let left = rect.left + rect.width / 2 - tipRect.width / 2
        if (left < 8) left = 8
        if (left + tipRect.width > window.innerWidth - 8) left = window.innerWidth - 8 - tipRect.width
        tip.style.left = `${left}px`
        tip.style.top = `${rect.top + window.scrollY - tipRect.height - 6}px`

        tip.addEventListener('mouseleave', (e) => {
          const related = e.relatedTarget as Node | null
          if (related && activeFnRef?.contains(related)) return
          removeTooltip()
        })
      })

      fnRef.addEventListener('mouseleave', (e) => {
        const related = e.relatedTarget as Node | null
        if (activeTooltip && related && activeTooltip.contains(related)) return
        removeTooltip()
      })

      fnRef.addEventListener('click', () => {
        const url = fnRef.dataset.fnUrl
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer')
        } else {
          const fn = document.getElementById('fn-' + fnRef.dataset.fn)
          if (fn) fn.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    })

    // Step jump buttons (in roadmap and CI overview)
    el.querySelectorAll<HTMLButtonElement>('.step-jump[data-jump], .step-jump[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.jump || btn.dataset.nav
        if (target) {
          navigateToSection(target)
        }
      })
    })

    // TOC links (scroll to anchor instead of changing hash)
    el.querySelectorAll<HTMLElement>('.toc-link').forEach(link => {
      link.style.cursor = 'pointer'
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const tocId = link.dataset.toc
        if (tocId) {
          const target = document.getElementById(tocId)
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
  }, [html, navigateToSection])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
