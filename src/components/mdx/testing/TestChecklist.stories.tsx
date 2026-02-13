import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestChecklist } from './TestChecklist'

const meta: Meta<typeof TestChecklist> = {
  title: 'MDX/Testing/TestChecklist',
  component: TestChecklist,
}

export default meta
type Story = StoryObj<typeof TestChecklist>

export const Default: Story = {}
