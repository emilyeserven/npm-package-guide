import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodingToolExplorer } from './CodingToolExplorer'

const meta: Meta<typeof CodingToolExplorer> = {
  title: 'MDX/Prompt Engineering/CodingToolExplorer',
  component: CodingToolExplorer,
}

export default meta
type Story = StoryObj<typeof CodingToolExplorer>

export const Default: Story = {}
