// @ts-nocheck
import { defineNuxtConfig } from "@nuxt/bridge"
const KIBO_LOCALE_COOKIE = "kibo-locale"
const LOCATION_COOKIE = "kibo_purchase_location"

export default defineNuxtConfig({
  head: {
    title: "kibo-nuxt-vue-starter",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [`./plugins/gql-fetch.ts`],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/stylelint-module", "@nuxtjs/style-resources", "@nuxtjs/fontawesome"],
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
      regular: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "nuxt-i18n",
    "@storefront-ui/nuxt",
    "cookie-universal-nuxt",
  ],
  i18n: {
    currency: "USD",
    country: "US",
    countries: [
      { name: "US", label: "United States", states: ["California", "Nevada"] },
      { name: "AT", label: "Austria" },
      { name: "DE", label: "Germany" },
      { name: "NL", label: "Netherlands" },
    ],
    currencies: [
      { name: "EUR", label: "Euro" },
      { name: "USD", label: "Dollar" },
    ],
    locales: [
      { code: "en", label: "English", file: "en.js", iso: "en" },
      { code: "de", label: "German", file: "de.js", iso: "de" },
    ],
    defaultLocale: "en",
    lazy: true,
    seo: true,
    langDir: "lang/",
    vueI18n: {
      fallbackLocale: "en",
      numberFormats: {
        en: {
          currency: {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
          },
        },
        de: {
          currency: {
            style: "currency",
            currency: "EUR",
            currencyDisplay: "symbol",
          },
        },
      },
      messages: {
        en: {
          welcome: "Welcome",
        },
        de: {
          welcome: "Wilkommen",
        },
      },
    },
    detectBrowserLanguage: {
      cookieKey: KIBO_LOCALE_COOKIE,
    },
  },
  axios: {
    baseURL: "",
    browserBaseURL: "",
  },
  styleResources: {
    scss: [
      require.resolve("@storefront-ui/shared/styles/_helpers.scss", {
        paths: [process.cwd()],
      }),
      "./assets/styles/_variables.scss",
      "./assets/styles/components/_atoms.scss",
      "./assets/styles/components/_molecules.scss",
      "./assets/styles/components/_organisms.scss",
      "./assets/styles/components/_custom.scss",
    ],
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    userCookieKey: process.env.KIBO_USER_COOKIE_KEY || "kibo_at",
    colorAttributeFQN: "Tenant~color",
    sizeAttributeFQN: "Tenant~size",
    fullfillmentOptions: [
      {
        value: "DirectShip",
        code: "DS",
        name: "Direct Ship",
        label: "Ship to Home",
        details: "Available to Ship",
        isRequired: false,
        shortName: "Ship",
      },
      {
        value: "InStorePickup",
        code: "SP",
        name: "In Store Pickup",
        label: "Pickup in Store",
        details: "Available at",
        isRequired: false,
        shortName: "Pickup",
      },
    ],
    storeLocationCookie: LOCATION_COOKIE,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^@storefront-ui/, "leaflet", "hammerjs"],
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "product_details_w_slug",
        path: "/product/:productCode/:slug",
        component: resolve(__dirname, "pages/product/index.vue"),
      })
      routes.push({
        name: "product_details",
        path: "/product/:productCode/",
        component: resolve(__dirname, "pages/product/index.vue"),
      })
      routes.push({
        name: "categories",
        path: "/c/:categoryCode",
        component: resolve(__dirname, "pages/category/index.vue"),
      })
      routes.push({
        name: "search_details",
        path: "/search/",
        component: resolve(__dirname, "pages/search.vue"),
      })
    },
    middleware: [],
  },
})
