// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      ADYEN_CLIENT_KEY: process.env.ADYEN_CLIENT_KEY || '',
    },
  },
  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: 'VSF x Nuxt3 (Boilerplate)' },
        { name: 'theme-color', content: '#018937' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-180x180.png' },
        {
          rel: 'stylesheet',
          href: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/6.0.1/adyen.css',
        },
      ],
    },
  },
  appConfig: {
    titleSuffix: 'Nuxt3',
  },
  imports: {
    dirs: ['composables/**', 'utils/**'],
  },
  css: ['~/styles/base.scss'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Red Hat Display': [400, 500, 700],
          'Red Hat Text': [300, 400, 500, 700],
        },
      },
    ],
    '@nuxt/image',
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
    },
    compressPublicAssets: true,
  },
  routeRules: {
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/icons/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/favicon.ico': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/magento/**': {
      proxy: 'http://localhost:3003/magento/**',
    },
  },
})
