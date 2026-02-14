import { CHECKLIST_ITEMS } from '../../../data/testingData'
import { ChecklistBase } from '../ChecklistBase'
import type { ChecklistBaseSection } from '../ChecklistBase'

const sections: ChecklistBaseSection[] = [{
  id: 'review',
  name: 'Review Criteria',
  icon: '\uD83D\uDCCB',
  items: CHECKLIST_ITEMS.map(item => ({
    label: item.label,
    description: item.detail,
  })),
}]

export function TestChecklist() {
  return (
    <ChecklistBase
      markdownTitle="Quick Test Review"
      sections={sections}
    />
  )
}
