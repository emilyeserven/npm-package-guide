import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink, NavPill } from './NavLink'
import { withRouter } from '../../../.storybook/decorators'

const meta: Meta = {
  title: 'MDX/NavLink',
  decorators: [withRouter],
}

export default meta

export const AutoTitle: StoryObj = {
  render: () => <NavLink to="build" />,
}

export const CustomChildren: StoryObj = {
  render: () => <NavLink to="build">bundlers and build tools</NavLink>,
}

export const Pill: StoryObj = {
  render: () => <NavPill to="deps">dependency management</NavPill>,
}
