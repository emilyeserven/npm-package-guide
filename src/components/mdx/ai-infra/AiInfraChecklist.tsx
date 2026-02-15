import { AI_INFRA_CHECKLIST } from '../../../data/aiInfraData'
import { ChecklistBase } from '../ChecklistBase'

export function AiInfraChecklist() {
  return (
    <ChecklistBase
      markdownTitle="AI Infrastructure Checklist"
      sections={AI_INFRA_CHECKLIST}
    />
  )
}
