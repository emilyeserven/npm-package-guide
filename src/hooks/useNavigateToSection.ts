import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'

export function useNavigateToSection() {
  const navigate = useNavigate()
  return useCallback((id: string, anchorId?: string) => {
    navigate({ to: '/$sectionId', params: { sectionId: id } })
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
