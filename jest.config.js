module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^~~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
    "^#app$": "@nuxt/bridge/dist/runtime/index.mjs",
  },
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
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  transformIgnorePatterns: ["node_modules/(?!@nuxtjs/style-resources|@nuxt/bridge)"],
  testEnvironment: "jsdom",
}
