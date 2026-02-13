import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetaTooling } from './MetaTooling'

const meta: Meta<typeof MetaTooling> = {
  title: 'MDX/Prompt Engineering/MetaTooling',
  component: MetaTooling,
}

export default meta
type Story = StoryObj<typeof MetaTooling>

export const CIIntegration: Story = { args: { toolId: 'ci-integration' } }

export const PromptVersioning: Story = { args: { toolId: 'prompt-versioning' } }
