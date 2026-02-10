import { useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

interface HtmlContentProps {
  html: string
  className?: string
  as?: keyof HTMLElementTagNameMap
}

export function HtmlContent({ html, className, as: Tag = 'div' }: HtmlContentProps) {
  const ref = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Inline nav links (buttons embedded in HTML strings)
    el.querySelectorAll<HTMLButtonElement>('.inline-nav-link, .inline-nav-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const navTarget = btn.dataset.nav
        if (navTarget) {
          navigate({ to: '/$sectionId', params: { sectionId: navTarget } })
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    })

    // Footnote references
    el.querySelectorAll<HTMLElement>('.fn-ref').forEach(fnRef => {
      fnRef.style.cursor = 'pointer'
      fnRef.addEventListener('click', () => {
        const fn = document.getElementById('fn-' + fnRef.dataset.fn)
        if (fn) fn.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    })

    // Step jump buttons (in roadmap and CI overview)
    el.querySelectorAll<HTMLButtonElement>('.step-jump[data-jump], .step-jump[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.jump || btn.dataset.nav
        if (target) {
          navigate({ to: '/$sectionId', params: { sectionId: target } })
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    })
  }, [html, navigate])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
