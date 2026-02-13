import { FRAMEWORK_PAGES } from '../../../data/archData'
import { ProsCons } from '../ProsCons'

export function FrameworkProsCons({ frameworkId }: { frameworkId: string }) {
  const fw = FRAMEWORK_PAGES.find(f => f.id === frameworkId)
  if (!fw) return null

  return <ProsCons pros={fw.pros} cons={fw.cons} bestFor={fw.bestFor} color={fw.color} accent={fw.accent} darkAccent={fw.darkAccent} />
}
