import type { Meta, StoryObj } from '@storybook/react-vite'
import { GuideChecklist } from '../GuideChecklist'

const meta: Meta<typeof GuideChecklist> = {
  title: 'MDX/NPM Package/PublishChecklist',
  component: GuideChecklist,
}

export default meta
type Story = StoryObj<typeof GuideChecklist>

export const Default: Story = { args: { checklistId: 'publish' } }
