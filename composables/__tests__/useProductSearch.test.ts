import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useProductSearch } from "../useProductSearch"

Vue.use(VueCompositionApi)

const productSearchResponse = {}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: productSearchResponse,
      }),
    },
  }),
}))

describe("[composable] useProductSearch", () => {
  const { result, search, loading, error } = useProductSearch(`product-search`)
  test("search: should search products and save as result", async () => {
    await search({ categoryCode: "32" })
    expect(result.value).toStrictEqual(productSearchResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
