import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useProductSearch } from "../useProductSearch"

Vue.use(VueCompositionApi)

const productSearchResponse = {
  data: {
    products: {
      facets: [
        {
          label: "Price",
          facetType: "RangeQuery",
          field: "Price",
          values: [
            {
              label: "50 to 100",
              count: 11,
              value: "price:[50 TO 100]",
              filterValue: "price:[50 TO 100]",
              isDisplayed: true,
              isApplied: true,
              childrenFacetValues: null,
            },
          ],
        },
      ],
      items: [
        {
          productCode: "MS-SHORT-005",
          content: {
            productName: "Shebeest Breezer Board Bike Shorts",
          },
        },
      ],
    },
  },
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: productSearchResponse.data,
      }),
    },
  }),
}))

describe("[composable] useProductSearch", () => {
  const { result, search, loading, error } = useProductSearch(`product-search`)
  test("search: should search products and save as result", async () => {
    await search({ categoryCode: "32", filters: ["Tenant~brand:carari"] })
    expect(result.value).toStrictEqual(productSearchResponse.data.products)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
