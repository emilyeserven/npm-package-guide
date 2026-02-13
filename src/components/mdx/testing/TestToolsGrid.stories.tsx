import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestToolsGrid } from './TestToolsGrid'

const meta: Meta<typeof TestToolsGrid> = {
  title: 'MDX/Testing/TestToolsGrid',
  component: TestToolsGrid,
}

export default meta
type Story = StoryObj<typeof TestToolsGrid>

export const Default: Story = {}
