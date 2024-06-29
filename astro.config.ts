import * as path from 'node:path'
import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config'
import { loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// astro integrations
import react from '@astrojs/react'
import node from '@astrojs/node'

// postcss plugins for vite.css.postcss (tailwindcss is directly configured via postcss vs. using `@astrojs/tailwind`)
import postCssOklabPolyfill from '@csstools/postcss-oklab-function'
import autoprefixer from 'autoprefixer'
import cssDiscardComments from 'postcss-discard-comments'
import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting'

const ENV = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '')
const IS_PRODUCTION = ENV.NODE_ENV === 'production'

/**
 * Astro configuration.
 * Caution: adding integrations or plugins via the astro cli may clobber this file and wipe out the comments.
 *
 * @see https://astro.build/config
 * @see https://docs.astro.build/en/guides/configuring-astro/
 * @see https://docs.astro.build/en/reference/configuration-reference/
 */
export default defineConfig({
  /**
   * Always set a site url for canonical urls, sitemaps, and other important features.
   */
  site: ENV.ASTRO_CONFIG_SITE_URL || 'localhost:4321',

  /**
   * Deployment of this demo is to a subdirectory so a deploy script will set this environment value.
   */
  base: ENV.ASTRO_CONFIG_BASE_PATHNAME || undefined,

  /**
   * Set _server_ mode for SSR rendering (vs. _hybrid_ for mixed or _static_ for SSG rendering).
   * This demo uses the node adapter in development to demonstrate SSR support vs. SSG for publishing the demo.
   *
   * @see https://docs.astro.build/en/reference/configuration-reference/#output
   */
  output: IS_PRODUCTION ? 'static' : 'server',

  /**
   * Use an adapter that suits your deployment target (e.g. node/standalone, vercel, netlify, etc).
   * This demo used the node adapter in development to demonstrate SSR support vs. SSG for publishing the demo.
   *
   * @see https://docs.astro.build/en/reference/configuration-reference/#adapter
   */
  adapter: IS_PRODUCTION
    ? undefined
    : node({
        mode: 'standalone',
      }),

  /**
   * Note that CSRF protection `checkOrigin: true` only works for server-rendered pages.
   * @see https://docs.astro.build/en/reference/configuration-reference/#security
   */
  security: {
    checkOrigin: true,
  },

  experimental: {
    /**
     * If enabled note you can reset the build cache when running build via: `npm run astro build -- --force`
     * @see https://docs.astro.build/en/reference/configuration-reference/#experimentalcontentcollectioncache
     */
    contentCollectionCache: false,

    /**
     * @see https://docs.astro.build/en/reference/configuration-reference/#experimentalactions
     */
    actions: false,

    // /**
    //  * @see https://docs.astro.build/en/reference/configuration-reference/#experimentalenv
    //  */
    // env: {
    //   schema: {
    //     DATABASE_URL: envField.string({
    //       context: 'server',
    //       access: 'secret',
    //     }),
    //   },
    // },
  },

  /**
   * It would be ideal to set 'always' or 'never' depending on deployment environment to sync the dev environment.
   * However those settings cause issues with any API routes and generated file routes with the dev server.
   */
  trailingSlash: 'ignore',

  /**
   * @see https://docs.astro.build/en/reference/configuration-reference/#integrations
   */
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
  ],

  /**
   * @see https://docs.astro.build/en/guides/prefetch/
   */
  prefetch: {
    defaultStrategy: 'viewport',
  },

  /**
   * Disable Astro's dev toolbar if it gets in your way by setting `enabled` to `false`.
   */
  devToolbar: {
    enabled: true,
  },

  /**
   * @see https://docs.astro.build/en/guides/routing/#redirects
   */
  redirects: {},

  /**
   * @see https://docs.astro.build/guides/internationalization/
   * @see https://docs.astro.build/recipes/i18n/
   */
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
      strategy: 'pathname',
    },
  },

  /**
   * Customize markdown support. This config is also inherited by the mdx integration if it is added.
   */
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      wrap: true,
    },
    gfm: true,
  },

  /**
   * Customize vite + rollup + esbuild + postcss configuration.
   * Reminder: currently vite hardcodes the watch path however it does not include `envDir` (verify again in future).
   *
   * @see https://docs.astro.build/en/reference/configuration-reference/#vite
   * @see https://vitejs.dev/config/
   */
  vite: {
    // envDir: '../..',
    // esbuild: { exclude: [] },

    // resolve: {
    //   alias: {
    //     '@': path.resolve(import.meta.dirname, 'src'),
    //   }
    // }

    ssr: {
      noExternal: ['three'],
    },

    plugins: [tsconfigPaths()],

    server: {
      watch: {
        followSymlinks: true,
      },
    },

    /**
     * Configure tailwindcss manually instead of using `@astrojs/tailwind` so we can manage postcss plugins
     */
    css: {
      postcss: {
        plugins: [
          tailwindcssNesting(),
          tailwindcss({ config: path.resolve(import.meta.dirname, 'tailwind.config.ts') }),
          postCssOklabPolyfill({ preserve: true }),
          autoprefixer(),
          cssDiscardComments({ removeAll: true }),
        ],
      },
    },

    /**
     * Customize build options for rollup.
     */
    build: {
      rollupOptions: {
        // treat the following packages as external to the bundle
        external: ['sharp'],

        // split these packages into their own chunks in case they are used in the project
        output: {
          manualChunks(path, _meta) {
            if (path.includes('node_modules/@react-three')) {
              return 'react-three'
            }
            if (path.includes('node_modules/three')) {
              return 'three'
            }
            if (path.includes('i18next-browser-languagedetector')) {
              return 'i18next'
            }
            if (path.includes('framer-motion')) {
              return 'framer-motion'
            }
            if (path.includes('node_modules/babylon') || path.includes('node_modules/@babylon')) {
              return 'babylon'
            }

            return
          },
        },
      },
      chunkSizeWarningLimit: 500,
    },
    optimizeDeps: {
      // add any packages that should be bundled
      // include: [],

      // customize esbuild configuration
      // esbuildOptions: {...},

      // add any packagesthat should be excluded from the bundle
      exclude: [
        '@resvg/resvg-js',

        // uncomment for projects using lucia with oslo for argon + bcrypt (note this will influence deployment process)
        // https://github.com/withastro/astro/issues/9859
        // '@node-rs/argon2',
        // '@node-rs/bcrypt',
      ],
    },
  },

  /**
   * Disable sharp for development because it has issues with the dev server but not production builds.
   */
  image: {
    service: IS_PRODUCTION ? sharpImageService() : passthroughImageService(),
  },
})
