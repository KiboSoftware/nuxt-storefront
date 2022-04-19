import { useProductLocationInventory } from "@/composables/useProductLocationInventory"
import { productLocationInventoryQuery } from "@/lib/gql/queries"

const mockGetProductLocationInventory = productLocationInventoryQuery

const productLocationInventoryResponse = {
  data: {
    productLocationInventory: {
      items: [
        {
          locationCode: "kw1",
          stockAvailable: 100,
          softStockAvailable: null,
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
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockGetProductLocationInventory) {
          return {
            data: productLocationInventoryResponse.data,
          }
        }
      }),
    },
  }),
}))
describe("[composable] useProductLocationInventory", () => {
  // ProductLocationInventory
  test("getProductLocationInventory: should fetch product location inventory", async () => {
    const variables = { productCode: "MS-CAM-004", locationCodes: "kw1" }

    const { load, productInventory, loading, error } = useProductLocationInventory()
    await load(variables.productCode, variables.locationCodes)
    expect(productInventory.value).toEqual(
      productLocationInventoryResponse.data.productLocationInventory.items
    )
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
