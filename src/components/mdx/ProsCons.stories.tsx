import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProsCons } from './ProsCons'

const meta: Meta<typeof ProsCons> = {
  title: 'MDX/ProsCons',
  component: ProsCons,
}

export default meta
type Story = StoryObj<typeof ProsCons>

export const MERNStack: Story = {
  args: {
    pros: [
      'Single language (JavaScript) across the entire stack',
      'Huge ecosystem and community support',
      'JSON flows naturally between all layers',
      'Great for real-time applications with Node.js',
    ],
    cons: [
      'MongoDB lacks ACID transactions for complex queries',
      'Node.js single-threaded — CPU-intensive tasks block the event loop',
      'JavaScript fatigue — ecosystem moves very fast',
    ],
    bestFor: 'Real-time apps, MVPs, startups that want rapid prototyping with a unified JavaScript stack.',
    color: '#10b981',
    accent: '#d1fae5',
    darkAccent: '#10b98118',
  },
}

export const LAMPStack: Story = {
  args: {
    pros: [
      'Battle-tested for decades — extremely stable',
      'Cheap hosting available everywhere',
      'Massive documentation and community',
    ],
    cons: [
      'PHP has a mixed reputation for code quality',
      'Monolithic architecture harder to scale horizontally',
      'No built-in real-time capabilities',
    ],
    bestFor: 'Content-heavy websites, WordPress-based projects, budget-conscious deployments.',
    color: '#f59e0b',
    accent: '#fef3c7',
    darkAccent: '#f59e0b18',
  },
}
