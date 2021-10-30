/* eslint-disable @typescript-eslint/no-explicit-any */
import VueCompositionApi from "@vue/composition-api"
import Vue from "vue"
import { useProduct } from "../useProduct"
import apiHelper from "@/utils/apiHelper"
import * as types from "@/server/types/Api"

Vue.use(VueCompositionApi)

describe("[composable] useProduct", () => {
  const getProductApiResponse: types.GetProductResponse = {
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

  const configureProductApiResponse: types.ConfigureProductResponse = {
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
    createDate: "",
    options: [{ attributeFQN: "tenant~color" }, { attributeFQN: "tenant~size" }],
    personalizationScore: 1,
    score: 1,
    updateDate: "",
    content: {},
  }

  // Mock the API response
  jest.spyOn(apiHelper, "getProduct").mockReturnValue(Promise.resolve(getProductApiResponse))
  jest
    .spyOn(apiHelper, "configureProduct")
    .mockReturnValue(Promise.resolve(configureProductApiResponse))

  // getProduct
  test("should get product", async () => {
    const { search, result: products, loading, error } = useProduct("products")
    const params = { id: "MS-JKT-012", customQuery: undefined }

    await search(params as any)
    expect(products.value).toEqual(getProductResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  // configureProduct
  test("should configure product", async () => {
    const { search, result: products, loading, error } = useProduct("products")
    const params = {
      id: "MS-JKT-012",
      attributes: { color: "red", size: "L" },
      customQuery: undefined,
    }

    await search(params as any)
    expect(products.value).toEqual(configureProductResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  // Todo: searchProducts
  // Todo: searchRelatedProducts
})
