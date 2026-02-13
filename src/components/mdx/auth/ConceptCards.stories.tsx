import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConceptCards } from './ConceptCards'

const meta: Meta<typeof ConceptCards> = {
  title: 'MDX/Auth/ConceptCards',
  component: ConceptCards,
}

export default meta
type Story = StoryObj<typeof ConceptCards>

export const CoreConcepts: Story = { args: { sectionId: 'core' } }

export const TokenConcepts: Story = { args: { sectionId: 'tokens' } }
