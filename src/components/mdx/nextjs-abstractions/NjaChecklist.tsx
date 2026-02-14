import { NJA_CHECKLIST } from '../../../data/njaData'
import { ChecklistBase } from '../ChecklistBase'

export function NjaChecklist() {
  return (
    <ChecklistBase
      markdownTitle="Next.js Migration Checklist"
      sections={NJA_CHECKLIST}
    />
  )
}
