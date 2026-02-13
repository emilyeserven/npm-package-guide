import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataFlowDiagram } from './DataFlowDiagram'

const meta: Meta<typeof DataFlowDiagram> = {
  title: 'MDX/Architecture/DataFlowDiagram',
  component: DataFlowDiagram,
}

export default meta
type Story = StoryObj<typeof DataFlowDiagram>

export const Default: Story = {}
