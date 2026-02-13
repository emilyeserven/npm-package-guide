import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToolDetail } from './ToolDetail'

const meta: Meta<typeof ToolDetail> = {
  title: 'MDX/Prompt Engineering/ToolDetail',
  component: ToolDetail,
}

export default meta
type Story = StoryObj<typeof ToolDetail>

export const MCPServers: Story = { args: { toolId: 'mcp-servers' } }

export const Skills: Story = { args: { toolId: 'skills' } }
