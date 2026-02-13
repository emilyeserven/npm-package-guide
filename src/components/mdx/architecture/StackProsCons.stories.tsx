import type { Meta, StoryObj } from '@storybook/react-vite'
import { StackProsCons } from './StackProsCons'

const meta: Meta<typeof StackProsCons> = {
  title: 'MDX/Architecture/StackProsCons',
  component: StackProsCons,
}

export default meta
type Story = StoryObj<typeof StackProsCons>

export const MERN: Story = { args: { stackId: 'mern' } }

export const LAMP: Story = { args: { stackId: 'lamp' } }
