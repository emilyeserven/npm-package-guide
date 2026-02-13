import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClaudeMdChecklist } from './ClaudeMdChecklist'

const meta: Meta<typeof ClaudeMdChecklist> = {
  title: 'MDX/Prompt Engineering/ClaudeMdChecklist',
  component: ClaudeMdChecklist,
}

export default meta
type Story = StoryObj<typeof ClaudeMdChecklist>

export const Default: Story = {}
