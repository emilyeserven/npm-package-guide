import type { Meta, StoryObj } from '@storybook/react-vite'
import { FrameworkExplorer } from './FrameworkExplorer'

const meta: Meta<typeof FrameworkExplorer> = {
  title: 'MDX/Architecture/FrameworkExplorer',
  component: FrameworkExplorer,
}

export default meta
type Story = StoryObj<typeof FrameworkExplorer>

export const NextJS: Story = { args: { frameworkId: 'nextjs' } }

export const ReactRouter: Story = { args: { frameworkId: 'react-router' } }
