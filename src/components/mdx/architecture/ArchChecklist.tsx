import { ARCH_CHECKLIST } from '../../../data/archData'
import { ChecklistBase } from '../ChecklistBase'

export function ArchChecklist() {
  return (
    <ChecklistBase
      markdownTitle="Architecture Checklist"
      sections={ARCH_CHECKLIST}
    />
  )
}
