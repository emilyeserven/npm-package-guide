import type { Meta, StoryObj } from '@storybook/react-vite'
import { JwtParts } from './JwtParts'

const meta: Meta<typeof JwtParts> = {
  title: 'MDX/Auth/JwtParts',
  component: JwtParts,
}

export default meta
type Story = StoryObj<typeof JwtParts>

export const Default: Story = {}
