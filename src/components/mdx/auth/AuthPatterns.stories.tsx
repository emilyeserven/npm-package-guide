import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthPatterns } from './AuthPatterns'

const meta: Meta<typeof AuthPatterns> = {
  title: 'MDX/Auth/AuthPatterns',
  component: AuthPatterns,
}

export default meta
type Story = StoryObj<typeof AuthPatterns>

export const Default: Story = {}
