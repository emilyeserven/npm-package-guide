import { useMemo } from 'react'
import { checklistItems } from '../../../data/checklistItems'
import { ChecklistBase } from '../ChecklistBase'
import type { ChecklistBaseSection } from '../ChecklistBase'

const categoryIcons: Record<string, string> = {
  Build: '\uD83D\uDD27',
  Types: '\uD83D\uDC8E',
  Config: '\u2699\uFE0F',
  Deps: '\uD83D\uDCE6',
  Docs: '\uD83D\uDCDD',
  'Pre-publish': '\uD83D\uDE80',
  Legal: '\uD83D\uDCDC',
}

export function PublishChecklist() {
  const sections = useMemo<ChecklistBaseSection[]>(() => {
    const categories = [...new Set(checklistItems.map(it => it.cat))]
    return categories.map(cat => ({
      id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: cat,
      icon: categoryIcons[cat] ?? '\u2705',
      items: checklistItems
        .filter(it => it.cat === cat)
        .map(it => ({ label: it.text })),
    }))
  }, [])

  return (
    <ChecklistBase
      markdownTitle="Publish Checklist"
      sections={sections}
    />
  )
}
