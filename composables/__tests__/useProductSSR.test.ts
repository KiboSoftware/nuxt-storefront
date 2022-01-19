import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useProduct } from "@/composables/useProduct"
import { getProductQuery } from "~~/gql/queries/product/getProduct"
import { configureProductMutation } from "~~/gql/mutations/product/configureProductMutation"

Vue.use(VueCompositionApi)
const mockGetProductQuery = getProductQuery
const mockConfigureProductMutation = configureProductMutation

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
      options: [{ attributeFQN: "tenant~color" }, { attributeFQN: "tenant~size" }],
    },
  },
  loading: false,
  networkStatus: 7,
  stale: false,
}

const configureProductResponse = {
  options: [{ attributeFQN: "tenant~color" }, { attributeFQN: "tenant~size" }],
  content: { productImages: undefined },
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
    const { product, configure, loading, error } = useProduct(productCode)
    await configure(
      [{ attributeFQN: "Tenant~color", value: "Black", shopperEnteredValue: undefined }],
      productCode
    )
    expect(product.value).toEqual(configureProductResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
