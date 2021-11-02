import { ref, computed, ComputedRef } from "@vue/composition-api"
import * as types from "@/composables/types"
import apiHelper from "@/utils/apiHelper"
import * as GraphQL from "@/server/types/GraphQL"
import { mergeProducts } from "@/composables/helpers/mergeProduct"

const configureProductApiPath = "/api/product/configureproduct"
const getProductApiPath = "/api/product/getproduct"
const searchProductApiPath = "/api/product/searchSuggestions"

const getProduct = async (params: types.GetProductParams): types.GetProductResponse => {
  const { id: productCode } = params
  const url = `${getProductApiPath}?productCode=${productCode}`

  const response = await apiHelper.getProduct("GET", url, {})
  return response.data?.product || {}
}

const configureProduct = async (
  params: types.ConfigureProductParams
): types.ConfigureProductResponse => {
  // Get Product
  const product = await getProduct(params)

  // Congiure Product
  const options = Object.keys(params?.attributes).map((a) => ({
    attributeFQN: `tenant~${a}`,
    value: params?.attributes[a],
  }))

  const url = `${configureProductApiPath}`
  const body = {
    product,
    options,
  }
  const configureProductRes = await apiHelper.configureProduct("POST", url, body)
  const configuredProduct = (await configureProductRes.data?.configureProduct) || {}

  // Return result
  return mergeProducts(product, configuredProduct)
}

const searchSuggestions = async (
  params: types.SearchSuggestionsParams
): types.SearchSuggestionsResponse => {
  const { id: productCode } = params

  const url = `${searchProductApiPath}?productCode=${productCode}`
  const response = await apiHelper.searchSuggestions("GET", url, {})

  return response.data?.products || {}
}

export const useProduct = (): types.useProductResponse => {
  const result = ref({})
  const loading = ref(false)
  const error = ref()

  // search
  const search = async (params: types.SearchParams) => {
    try {
      loading.value = true

      const isConfigureProductParams = (params: types.ConfigureProductParams) =>
        params.attributes !== undefined

      const isGetProductParams = (params: types.GetProductParams) => params.id !== undefined

      result.value = isConfigureProductParams(params as types.ConfigureProductParams)
        ? await configureProduct(params as types.ConfigureProductParams)
        : isGetProductParams(params as types.GetProductParams)
        ? await getProduct(params as types.GetProductParams)
        : await searchSuggestions(params as types.SearchSuggestionsParams)

      error.value = null
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    search,
    result: computed(() => result.value) as ComputedRef<GraphQL.Product>,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
