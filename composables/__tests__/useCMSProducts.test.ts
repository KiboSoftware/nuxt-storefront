import { useCMSProducts } from "../useCMSProducts"

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
}))

jest.mock("@/lib/operations/get-page", () => {
  return {
    getPage: () => {
      return Promise.resolve({ components: [] })
    },
  }
})

describe("[composable] useCMSProducts", () => {
  const { load, result, loading, error } = useCMSProducts("BackP_024")
  test("should return CMS products", async () => {
    await load({ productCode: "", config: {} })

    expect(result.value).toStrictEqual({ components: [] })
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
