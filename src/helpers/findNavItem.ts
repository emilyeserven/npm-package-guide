import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'

export function findNavItem(id: string): { id: string; title: string } | undefined {
  return (
    sections.find(s => s.id === id) ??
    ciPages.find(p => p.id === id) ??
    bonusSections.find(b => b.id === id)
  )
}
