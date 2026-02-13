import type { Meta, StoryObj } from '@storybook/react-vite'
import { TechniqueDetail } from './TechniqueDetail'

const meta: Meta<typeof TechniqueDetail> = {
  title: 'MDX/Prompt Engineering/TechniqueDetail',
  component: TechniqueDetail,
}

export default meta
type Story = StoryObj<typeof TechniqueDetail>

export const ClaudeMd: Story = { args: { techniqueId: 'claude-md' } }

export const FewShot: Story = { args: { techniqueId: 'few-shot' } }
