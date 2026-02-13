import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatternCards } from './PatternCards'

const meta: Meta<typeof PatternCards> = {
  title: 'MDX/CI-CD/PatternCards',
  component: PatternCards,
}

export default meta
type Story = StoryObj<typeof PatternCards>

export const Default: Story = {}
