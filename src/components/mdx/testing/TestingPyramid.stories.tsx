import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestingPyramid } from './TestingPyramid'
import { withRouter } from '../../../../.storybook/decorators'

const meta: Meta = {
  title: 'MDX/Testing/TestingPyramid',
  decorators: [withRouter],
}

export default meta

export const Default: StoryObj = {
  render: () => <TestingPyramid />,
}
