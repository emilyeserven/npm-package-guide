import type { Meta, StoryObj } from '@storybook/react-vite'
import { MistakeList } from './MistakeList'

const meta: Meta<typeof MistakeList> = {
  title: 'MDX/Prompt Engineering/MistakeList',
  component: MistakeList,
}

export default meta
type Story = StoryObj<typeof MistakeList>

export const Logic: Story = { args: { categoryId: 'logic' } }

export const APIs: Story = { args: { categoryId: 'apis' } }

export const Structural: Story = { args: { categoryId: 'structural' } }
