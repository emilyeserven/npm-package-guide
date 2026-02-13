import type { Meta, StoryObj } from '@storybook/react-vite'
import { FrameworkProsCons } from './FrameworkProsCons'

const meta: Meta<typeof FrameworkProsCons> = {
  title: 'MDX/Architecture/FrameworkProsCons',
  component: FrameworkProsCons,
}

export default meta
type Story = StoryObj<typeof FrameworkProsCons>

export const NextJS: Story = { args: { frameworkId: 'nextjs' } }

export const ReactRouter: Story = { args: { frameworkId: 'react-router' } }
