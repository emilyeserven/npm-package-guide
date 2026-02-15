import { K8S_SECTIONS } from '../../../data/k8sData'
import { YamlExplorerBase } from '../YamlExplorerBase'

export function K8sYamlExplorer({ sectionId }: { sectionId: string }) {
  const section = K8S_SECTIONS.find(s => s.id === sectionId)
  if (!section?.yamlLines) return null

  return <YamlExplorerBase lines={section.yamlLines} fileName={section.yamlFileName} />
}
