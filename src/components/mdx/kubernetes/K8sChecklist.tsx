import { K8S_CHECKLIST } from '../../../data/k8sChecklist'
import { ChecklistBase } from '../ChecklistBase'

export function K8sChecklist() {
  return (
    <ChecklistBase
      markdownTitle="Kubernetes Checklist"
      sections={K8S_CHECKLIST}
    />
  )
}
