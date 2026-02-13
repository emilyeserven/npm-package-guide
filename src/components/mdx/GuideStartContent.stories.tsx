import type { Meta, StoryObj } from '@storybook/react-vite'
import { GuideStartContent } from './GuideStartContent'
import { withRouter } from '../../../.storybook/decorators'

const meta: Meta<typeof GuideStartContent> = {
  title: 'MDX/GuideStartContent',
  component: GuideStartContent,
  decorators: [withRouter],
}

export default meta
type Story = StoryObj<typeof GuideStartContent>

export const NPMPackage: Story = { args: { guideId: 'npm-package' } }

export const Architecture: Story = { args: { guideId: 'architecture' } }

export const Testing: Story = { args: { guideId: 'testing' } }

export const PromptEngineering: Story = { args: { guideId: 'prompt-engineering' } }
