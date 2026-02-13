import type { Meta, StoryObj } from '@storybook/react-vite'
import { SecurityThreats } from './SecurityThreats'

const meta: Meta<typeof SecurityThreats> = {
  title: 'MDX/Auth/SecurityThreats',
  component: SecurityThreats,
}

export default meta
type Story = StoryObj<typeof SecurityThreats>

export const Default: Story = {}
