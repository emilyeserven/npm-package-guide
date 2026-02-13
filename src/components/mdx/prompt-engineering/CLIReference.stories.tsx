import type { Meta, StoryObj } from '@storybook/react-vite'
import { CLIReference } from './CLIReference'

const meta: Meta<typeof CLIReference> = {
  title: 'MDX/Prompt Engineering/CLIReference',
  component: CLIReference,
}

export default meta
type Story = StoryObj<typeof CLIReference>

export const Default: Story = {}
