import { CLAUDEMD_CHECKLIST } from '../../../data/promptData'
import { ChecklistBase } from '../ChecklistBase'

export function ClaudeMdChecklist() {
  return (
    <ChecklistBase
      markdownTitle="CLAUDE.md Checklist"
      sections={CLAUDEMD_CHECKLIST}
    />
  )
}
