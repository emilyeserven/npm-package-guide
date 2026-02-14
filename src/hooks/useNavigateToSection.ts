import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'

export function useNavigateToSection() {
  const navigate = useNavigate()
  return useCallback((id: string, anchorIdOrOpts?: string | { search: Record<string, string> }) => {
    const anchorId = typeof anchorIdOrOpts === 'string' ? anchorIdOrOpts : undefined
    const search = typeof anchorIdOrOpts === 'object' ? anchorIdOrOpts.search : undefined

    navigate({ to: '/$sectionId', params: { sectionId: id }, search: search ?? {} })
    if (anchorId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(anchorId)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }, 100)
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [navigate])
}
