import type { Meta, StoryObj } from '@storybook/react-vite'
import { OAuthFlow } from './OAuthFlow'

const meta: Meta<typeof OAuthFlow> = {
  title: 'MDX/Auth/OAuthFlow',
  component: OAuthFlow,
}

export default meta
type Story = StoryObj<typeof OAuthFlow>

export const Default: Story = {}
