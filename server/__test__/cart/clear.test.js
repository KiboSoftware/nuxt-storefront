const { resolve } = require("path")
const { Nuxt, Builder } = require("nuxt")
const request = require("supertest")
const nuxtConfig = require("../../../nuxt.config")

let nuxt = null

beforeAll(async () => {
  // nuxt = new Nuxt({  dev: process.env.NODE_ENV !== "production", rootDir: resolve(__dirname, "../../../"), })

  nuxt = new Nuxt({
    ...nuxtConfig,
    server: { port: 3000 },
    buildDir: ".nuxt-build-jest",
  })

  await new Builder(nuxt).build()

  await nuxt.server.listen(3000, "localhost")
}, 30000)

// Example of testing only generated html
describe("GET /", () => {
  test("Route / exits and render HTML", async () => {
    const response = await request(nuxt.server.app).get("/api/cart")
    expect(response).toMatch("boo")
  })
})

// Close server and ask nuxt to stop listening to file changes
afterAll(() => {
  nuxt.close()
})
