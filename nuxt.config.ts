import { defineNuxtConfig } from "@nuxt/bridge"

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },

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
  css: ["@storefront-ui/vue/styles.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/stylelint-module"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],

  axios: {
    baseURL: "",
    browserBaseURL: "",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^@storefront-ui/],
  },

  serverMiddleware: [{ path: "/", handler: "~/api" }],
})
