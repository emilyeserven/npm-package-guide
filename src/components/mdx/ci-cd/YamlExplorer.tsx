import { YAML_LINES } from '../../../data/cicdData'
import { YamlExplorerBase } from '../YamlExplorerBase'

export function YamlExplorer() {
  return <YamlExplorerBase lines={YAML_LINES} fileName=".github/workflows/ci.yml" />
}
