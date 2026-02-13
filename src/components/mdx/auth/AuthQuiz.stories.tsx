import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthQuiz } from './AuthQuiz'

const meta: Meta<typeof AuthQuiz> = {
  title: 'MDX/Auth/AuthQuiz',
  component: AuthQuiz,
}

export default meta
type Story = StoryObj<typeof AuthQuiz>

export const Default: Story = {}
