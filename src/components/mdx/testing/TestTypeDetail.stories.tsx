import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestTypeDetail } from './TestTypeDetail'

const meta: Meta<typeof TestTypeDetail> = {
  title: 'MDX/Testing/TestTypeDetail',
  component: TestTypeDetail,
}

export default meta
type Story = StoryObj<typeof TestTypeDetail>

export const Unit: Story = { args: { type: 'unit' } }

export const Component: Story = { args: { type: 'component' } }

export const E2E: Story = { args: { type: 'e2e' } }
