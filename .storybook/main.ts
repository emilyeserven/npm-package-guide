import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  framework: '@storybook/react-vite',

  addons: ['@storybook/addon-themes'],

  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const tailwindcss = (await import('@tailwindcss/vite')).default

    // Remove vite-plugin-pwa plugins inherited from root vite.config.ts —
    // PWA service worker precaching is not needed for Storybook and fails
    // on large Storybook manager bundles that exceed the workbox size limit.
    config.plugins = (config.plugins ?? []).flat().filter(
      (p) => !p || typeof p !== 'object' || !('name' in p) || !String(p.name).startsWith('vite-plugin-pwa'),
    )

    return mergeConfig(config, {
      plugins: [tailwindcss()],
      base: process.env.STORYBOOK_BASE_PATH || config.base,
    })
  },
}

export default config
