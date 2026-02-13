import type { Meta, StoryObj } from '@storybook/react-vite'
import { YamlExplorer } from './YamlExplorer'

const meta: Meta<typeof YamlExplorer> = {
  title: 'MDX/CI-CD/YamlExplorer',
  component: YamlExplorer,
}

export default meta
type Story = StoryObj<typeof YamlExplorer>

export const Default: Story = {}
