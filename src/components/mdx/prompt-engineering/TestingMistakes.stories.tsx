import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestingMistakes } from './TestingMistakes'

const meta: Meta<typeof TestingMistakes> = {
  title: 'MDX/Prompt Engineering/TestingMistakes',
  component: TestingMistakes,
}

export default meta
type Story = StoryObj<typeof TestingMistakes>

export const AllMistakes: Story = {}

export const E2EOnly: Story = { args: { context: 'e2e' } }

export const UnitOnly: Story = { args: { context: 'unit' } }
