module.exports = {  
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  transform: {
    '\\.(js|ts)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript'
        ],
        plugins: ['@babel/plugin-transform-runtime']
      }
    ],
    ".*\\.(vue)$": "vue-jest"
  },
  collectCoverage: true,
  transformIgnorePatterns: [
    "node_modules/(?!@nuxtjs/style-resources)"
  ],  
  testEnvironment: 'jsdom',
}
