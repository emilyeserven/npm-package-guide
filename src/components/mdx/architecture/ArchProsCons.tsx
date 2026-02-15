import { STACK_PAGES, FRAMEWORK_PAGES } from '../../../data/archData'
import { ProsCons } from '../ProsCons'

export function StackProsCons({ stackId }: { stackId: string }) {
  const stack = STACK_PAGES.find(s => s.id === stackId)
  if (!stack) return null

  return <ProsCons pros={stack.pros} cons={stack.cons} bestFor={stack.bestFor} color={stack.color} accent={stack.accent} darkAccent={stack.darkAccent} />
}

export function FrameworkProsCons({ frameworkId }: { frameworkId: string }) {
  const fw = FRAMEWORK_PAGES.find(f => f.id === frameworkId)
  if (!fw) return null

  return <ProsCons pros={fw.pros} cons={fw.cons} bestFor={fw.bestFor} color={fw.color} accent={fw.accent} darkAccent={fw.darkAccent} />
}
