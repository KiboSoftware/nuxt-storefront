module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^~~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
    "^#app$": "@nuxt/bridge/dist/runtime/index.mjs",
    "^@nuxtjs/composition-api$": "@nuxt/bridge/dist/runtime/capi.legacy.mjs",
    "^.+.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "\\.(js|ts|mjs)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
        ],
        plugins: ["@babel/plugin-transform-runtime"],
      },
    ],
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "vue"],
  transformIgnorePatterns: ["node_modules/(?!@nuxtjs/style-resources|@nuxt/bridge|@storefront-ui)"],
  testEnvironment: "jsdom",
}
