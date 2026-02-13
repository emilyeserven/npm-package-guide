import type { Meta, StoryObj } from '@storybook/react-vite'
import { Cmd } from './Cmd'

const meta: Meta<typeof Cmd> = {
  title: 'MDX/Cmd',
  component: Cmd,
}

export default meta
type Story = StoryObj<typeof Cmd>

export const NpmInstall: Story = {
  args: { npm: 'npm install lodash' },
}

export const WithExplicitPnpm: Story = {
  args: { npm: 'npm publish', pnpm: 'pnpm publish --no-git-checks' },
}
