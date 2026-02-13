import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayerDiagram } from './LayerDiagram'

const meta: Meta<typeof LayerDiagram> = {
  title: 'MDX/Architecture/LayerDiagram',
  component: LayerDiagram,
}

export default meta
type Story = StoryObj<typeof LayerDiagram>

export const Default: Story = {}
