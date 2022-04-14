import { useProduct } from "@/composables/useProduct"
import { getProductQuery, productLocationInventoryQuery } from "@/lib/gql/queries"
import { configureProductMutation } from "@/lib/gql/mutations/product/configureProductMutation"

const mockGetProductQuery = getProductQuery
const mockConfigureProductMutation = configureProductMutation
const mockGetProductLocationInventory = productLocationInventoryQuery
// getProduct
const getProductApiResponse = {
  data: {
    product: {
      createDate: "",
      personalizationScore: 1,
      score: 1,
      updateDate: "",
      options: [{ attributeFQN: "tenant~color" }, { attributeFQN: "tenant~size" }],
    },
  },
  loading: false,
  networkStatus: 7,
  stale: false,
}
const getProductResponse = getProductApiResponse.data.product
// configureProduct
const configureProductApiResponse = {
  data: {
    configureProduct: {
      createDate: "",
      personalizationScore: 1,
      score: 1,
      updateDate: "",
      options: [{ attributeFQN: "tenant~color" }, { attributeFQN: "tenant~size" }],
    },
  },
  loading: false,
  networkStatus: 7,
  stale: false,
}
const configureProductResponse = {
  createDate: "",
  personalizationScore: 1,
  score: 1,
  updateDate: "",
  options: [{ attributeFQN: "tenant~color" }, { attributeFQN: "tenant~size" }],
  content: { productImages: undefined },
}

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
        if (params.query === mockGetProductQuery) {
          return {
            data: getProductApiResponse.data,
          }
        } else if (params.query === mockConfigureProductMutation) {
          return {
            data: configureProductApiResponse.data,
          }
        } else if (params.query === mockGetProductLocationInventory) {
          return {
            data: productLocationInventoryResponse.data,
          }
        }
      }),
    },
  }),
}))
describe("[composable] useProduct", () => {
  const productCode = "MS-JKT-012"
  // getProduct
  test("load: should load product", async () => {
    const { product, load, loading, error } = useProduct(productCode)
    await load(productCode)
    expect(product.value).toEqual(getProductResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
  // configureProduct
  test("load: should configure product", async () => {
    const { product, load, configure, loading, error } = useProduct(productCode)
    await load(productCode)
    await configure(
      [{ attributeFQN: "Tenant~color", value: "Black", shopperEnteredValue: undefined }],
      productCode
    )
    expect(product.value).toEqual(configureProductResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  // ProductLocationInventory
  test("getProductLocationInventory: should fetch product location inventory", async () => {
    const variables = { productCode: "MS-CAM-004", locationCodes: "kw1" }

    const { getProductLocationInventory, loading, error } = useProduct(productCode)
    const response = await getProductLocationInventory(
      variables.productCode,
      variables.locationCodes
    )
    expect(response).toEqual(productLocationInventoryResponse.data.productLocationInventory.items)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
