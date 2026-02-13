import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  framework: '@storybook/react-vite',

  addons: ['@storybook/addon-themes'],

  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const tailwindcss = (await import('@tailwindcss/vite')).default

    return mergeConfig(config, {
      plugins: [tailwindcss()],
      base: process.env.STORYBOOK_BASE_PATH || config.base,
    })
  },
}

export default config
