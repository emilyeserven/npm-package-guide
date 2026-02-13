import type { Meta, StoryObj } from '@storybook/react-vite'
import { PublishChecklist } from './PublishChecklist'

const meta: Meta<typeof PublishChecklist> = {
  title: 'MDX/NPM Package/PublishChecklist',
  component: PublishChecklist,
}

export default meta
type Story = StoryObj<typeof PublishChecklist>

export const Default: Story = {}
