import { STACK_PAGES } from '../../data/archData'
import { ProsCons } from './ProsCons'

export function StackProsCons({ stackId }: { stackId: string }) {
  const stack = STACK_PAGES.find(s => s.id === stackId)
  if (!stack) return null

  return <ProsCons pros={stack.pros} cons={stack.cons} bestFor={stack.bestFor} color={stack.color} accent={stack.accent} darkAccent={stack.darkAccent} />
}
