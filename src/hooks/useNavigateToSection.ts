import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'

export function useNavigateToSection() {
  const navigate = useNavigate()
  return useCallback((id: string) => {
    if (id === 'roadmap') {
      navigate({ to: '/' })
    } else {
      navigate({ to: '/$sectionId', params: { sectionId: id } })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [navigate])
}
