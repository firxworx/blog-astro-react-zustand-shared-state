import plugin from 'tailwindcss/plugin'
import type { OptionalConfig } from 'tailwindcss/types/config'

import containerQueriesPlugin from '@tailwindcss/container-queries'
import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'

const HTML_BASE_FONT_SIZE_PX = 16

export const projectPreset: Partial<OptionalConfig> = {
  darkMode: 'class',
  theme: {
    extend: {
      gap: {
        '0.25': '0.0625rem',
      },
    },
  },
  plugins: [
    // official tailwindcss plugins
    typographyPlugin,
    formsPlugin,
    containerQueriesPlugin,

    /**
     * Inline plugin definition to specify global css variables (custom properties)
     * and to add custom tailwind utilities/classes.
     *
     * Note the plugin function is also passed the `theme()` function which can be used to access
     * the theme configuration object and reference values from it.
     */
    plugin(({ addBase, addComponents, addUtilities }) => {
      /**
       * Add global css including css variables for light and dark themes.
       */
      addBase({
        ':root': {
          'color-scheme': 'light',

          // add css variables for light theme here...
          // '--background': '0 0% 100%',
        },
        '.dark': {
          'color-scheme': 'dark',

          // add css variables for dark theme here..
          // '--background': '0 0% 100%',
        },

        /**
         * Disable animations and transitions if the user has reduced motion enabled.
         */
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
            'scroll-behavior': 'auto !important',
          },
        },

        /**
         * Scroll margin allowance below focused elements to ensure they are clearly in view.
         * @see https://moderncss.dev/modern-css-for-dynamic-component-based-architecture/
         */
        ':target': {
          'scroll-margin-block-start': '2rem',
        },

        /**
         * Scroll margin allowance below focused elements to ensure they are clearly in view.
         * @see https://moderncss.dev/modern-css-for-dynamic-component-based-architecture/)
         */
        ':focus': {
          'scroll-margin-block-end': '8vh',
        },

        html: {
          '@apply antialiased motion-safe:scroll-smooth scroll-pt-10': {},
          'font-feature-settings': '"rlig" 1, "calt" 1',
          fontSize: `${HTML_BASE_FONT_SIZE_PX}px`,
        },

        body: {
          // a default line-height is required to enable fallback fonts to work and avoid CLS
          '@apply font-sans leading-normal': {},

          // removal of chrome default blue on focus (in favour of custom focus styles)
          'input:focus, textarea:focus, select:focus': {
            outline: 'none',
          },

          // apply consistent :disabled styles to all buttons
          "button,[type='button'],[type='reset'],[type='submit']": {
            '@apply cx-disabled': {},
          },

          // set default image behaviour to prevent accidental overflow
          img: {
            '@apply block max-w-full': {},
            '&.full-width': {
              '@apply w-full max-h-[45vh] object-cover': {},
            },
          },
        },
      })

      /**
       * Custom utilities can be used with tailwind's responsive breakpoints.
       * Utilities defined here can be applied using the `@apply` directive just like other tailwind classes.
       */
      addUtilities({
        '.cx-focus': {
          '@apply !outline-none focus:outline-none focus-visible:outline-none': {},
          '@apply focus-visible:ring focus-visible:ring-orange-400/25': {},

          '&:is(a)': {
            '@apply focus-visible:rounded-md': {},
          },

          '&:is(input)': {
            '@apply focus:shadow-none': {},
            '@apply focus-visible:border-opacity-50': {},
          },
        },
      })

      /**
       * Custom classes registered as tailwindcss components can have their `class` utilities
       * overridden by other tailwindcss classes.
       *
       * They can be applied using the `@apply` directive in the same way as other tailwind classes.
       */
      addComponents({
        // override tailwind theme container (original is disabled per `corePlugins.container: false` in the config)
        '.container': {
          '@apply px-4 md:px-6 mx-auto w-full max-w-7xl': {},
        },

        // define a common disabled style for inactive elements such as inputs and buttons
        '.cx-disabled': {
          '@apply disabled:pointer-events-none disabled:cursor-default disabled:opacity-50': {},
        },
      })
    }),
  ],
} satisfies Partial<OptionalConfig>

export default projectPreset
