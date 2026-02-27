import { useMemo } from 'react'
import { ChecklistBase } from './ChecklistBase'
import { checklistRegistry } from '../../data/guideRegistry'

interface GuideChecklistProps {
  checklistId: string
}

export function GuideChecklist({ checklistId }: GuideChecklistProps) {
  const entry = useMemo(() => checklistRegistry.get(checklistId), [checklistId])

  if (!entry) return null

  return (
    <ChecklistBase
      markdownTitle={entry.title}
      sections={entry.sections}
    />
  )
}
