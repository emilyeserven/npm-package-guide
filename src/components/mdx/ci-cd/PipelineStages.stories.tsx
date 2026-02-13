import type { Meta, StoryObj } from '@storybook/react-vite'
import { PipelineStages } from './PipelineStages'

const meta: Meta<typeof PipelineStages> = {
  title: 'MDX/CI-CD/PipelineStages',
  component: PipelineStages,
}

export default meta
type Story = StoryObj<typeof PipelineStages>

export const Default: Story = {}
