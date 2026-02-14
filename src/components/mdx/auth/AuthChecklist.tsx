import { useMemo } from 'react'
import { AUTH_CHECKLIST_ITEMS } from '../../../data/authData'
import { ChecklistBase } from '../ChecklistBase'
import type { ChecklistBaseSection } from '../ChecklistBase'

const categoryIcons: Record<string, string> = {
  Storage: '\uD83D\uDCBE',
  Tokens: '\uD83C\uDFAB',
  Architecture: '\uD83C\uDFD7\uFE0F',
  OAuth: '\uD83D\uDD11',
  Security: '\uD83D\uDEE1\uFE0F',
}

export function AuthChecklist() {
  const sections = useMemo<ChecklistBaseSection[]>(() => {
    const categories = [...new Set(AUTH_CHECKLIST_ITEMS.map(it => it.category))]
    return categories.map(cat => ({
      id: cat.toLowerCase(),
      name: cat,
      icon: categoryIcons[cat] ?? '\u2705',
      items: AUTH_CHECKLIST_ITEMS
        .filter(it => it.category === cat)
        .map(it => ({ label: it.text })),
    }))
  }, [])

  return (
    <ChecklistBase
      markdownTitle="Auth Implementation Checklist"
      sections={sections}
    />
  )
}
