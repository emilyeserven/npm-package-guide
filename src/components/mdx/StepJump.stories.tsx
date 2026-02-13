import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepJump } from './StepJump'
import { withRouter } from '../../../.storybook/decorators'

const meta: Meta = {
  title: 'MDX/StepJump',
  decorators: [withRouter],
}

export default meta

export const Default: StoryObj = {
  render: () => <StepJump to="build">Go to Build section</StepJump>,
}
