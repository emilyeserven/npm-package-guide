import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthChecklist } from './AuthChecklist'

const meta: Meta<typeof AuthChecklist> = {
  title: 'MDX/Auth/AuthChecklist',
  component: AuthChecklist,
}

export default meta
type Story = StoryObj<typeof AuthChecklist>

export const Default: Story = {}
