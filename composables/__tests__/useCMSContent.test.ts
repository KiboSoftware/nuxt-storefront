import { useCMSContent } from "../useCMSContent"

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

describe("[composable] useCMSContent", () => {
  const { load, result, loading, error } = useCMSContent()

  test("should return CMS content", async () => {
    await load()

    expect(result.value).toStrictEqual({ components: [] })
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
