import type { Meta, StoryObj } from '@storybook/react-vite'
import { RoadmapSteps } from './RoadmapSteps'
import { withRouter } from '../../../../.storybook/decorators'

const meta: Meta = {
  title: 'MDX/NPM Package/RoadmapSteps',
  decorators: [withRouter],
}

export default meta

export const Default: StoryObj = {
  render: () => <RoadmapSteps />,
}
