import type { Meta, StoryObj } from '@storybook/react-vite'
import { GotchaAccordion } from './GotchaAccordion'

const meta: Meta<typeof GotchaAccordion> = {
  title: 'MDX/CI-CD/GotchaAccordion',
  component: GotchaAccordion,
}

export default meta
type Story = StoryObj<typeof GotchaAccordion>

export const Default: Story = {}
