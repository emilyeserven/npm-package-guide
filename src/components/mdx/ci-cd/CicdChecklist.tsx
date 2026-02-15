import { CICD_CHECKLIST } from '../../../data/cicdChecklist'
import { ChecklistBase } from '../ChecklistBase'

export function CicdChecklist() {
  return (
    <ChecklistBase
      markdownTitle="CI/CD Checklist"
      sections={CICD_CHECKLIST}
    />
  )
}
