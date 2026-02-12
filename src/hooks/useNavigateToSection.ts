import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'

export function useNavigateToSection() {
  const navigate = useNavigate()
  return useCallback((id: string) => {
    navigate({ to: '/$sectionId', params: { sectionId: id } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [navigate])
}
