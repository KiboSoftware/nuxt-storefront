import { useFacet } from "../useFacet"
import { Maybe, PrCategory } from "@/server/types/GraphQL"

const categoryTreeResponse: Maybe<Array<Maybe<PrCategory>>> = []

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: {
          categoriesTree: {
            items: categoryTreeResponse,
          },
        },
      }),
    },
  }),
}))

describe("[composable] useFacet", () => {
  const { result, search, loading, error } = useFacet("category-listing")
  test("search: should search categories and save as result", async () => {
    await search({ categoryCode: "32" })
    expect(result.value).toStrictEqual({ categories: categoryTreeResponse })
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
