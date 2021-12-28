module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:nuxt/recommended", "prettier"],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "import/named": "off",
    "vue/multi-word-component-names": 0,
  },
  ignorePatterns: ["server/types/GraphQL.ts"],
}
