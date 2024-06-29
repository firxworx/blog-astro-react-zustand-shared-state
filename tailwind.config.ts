import type { Config } from 'tailwindcss'
import projectPreset from './tailwind.preset'

/**
 * @see https://tailwindcss.com/docs/configuration
 */
const tailwindConfig = {
  // dark mode strategy should be specified as a string _not_ an array in the latest tailwindcss release
  darkMode: 'class',

  // disable tailwind's default `.container` utility as the preset provides a fluid replacement
  corePlugins: {
    container: false,
  },

  // project preset includes plugins, global css, custom utilities, and theme customizations
  presets: [projectPreset],

  // content array customized for postcss + vite + tailwindcss
  content: {
    files: ['./src/**/*!(*.stories|*.spec|*.test).{ts,tsx,astro,vue,svelte,js,jsx,md,mdx,html}'],
  },

  // theme customizations specified below will override those from any presets where there are conflicts
  // it is recommended to define theme customizations in `tailwind.preset.ts` instead of this config file
  theme: {},
} satisfies Config

export default tailwindConfig
