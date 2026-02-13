import type { Meta, StoryObj } from '@storybook/react-vite'
import { StackExplorer } from './StackExplorer'

const meta: Meta<typeof StackExplorer> = {
  title: 'MDX/Architecture/StackExplorer',
  component: StackExplorer,
}

export default meta
type Story = StoryObj<typeof StackExplorer>

export const MERN: Story = {
  args: { stackId: 'mern' },
}

export const PFRN: Story = {
  args: { stackId: 'pfrn' },
}
