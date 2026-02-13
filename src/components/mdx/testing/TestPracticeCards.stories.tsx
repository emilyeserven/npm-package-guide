import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestPracticeCards } from './TestPracticeCards'

const meta: Meta<typeof TestPracticeCards> = {
  title: 'MDX/Testing/TestPracticeCards',
  component: TestPracticeCards,
}

export default meta
type Story = StoryObj<typeof TestPracticeCards>

export const DoCards: Story = { args: { type: 'do' } }

export const DontCards: Story = { args: { type: 'dont' } }
