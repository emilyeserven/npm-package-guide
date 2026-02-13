import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

/** Legacy redirect: #/architecture → #/arch-start */
export function ArchitectureRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/$sectionId', params: { sectionId: 'arch-start' }, replace: true })
  }, [navigate])
  return null
}
