import { ref, computed } from "@vue/composition-api"
import * as types from "@/composables/types"
import apiHelper from "@/utils/apiHelper"

const searchRelatedProductsApiPath = "/api/product/getProducts"

export const useSearchRelatedProducts = (): types.useSearchRelatedProductsResponse => {
  const result = ref({})
  const loading = ref(false)
  const error = ref()

  // getRelatedProducts
  const searchRelatedProducts = async (params: types.SearchRelatedProductsParams) => {
    const { limit, id } = params
    try {
      loading.value = true

      const url = `${searchRelatedProductsApiPath}?filter=productCode ne '${id}'&pageSize=${limit}`
      const response = await apiHelper.getProducts("GET", url, {})

      result.value = response
      error.value.search = null
    } catch (err) {
      error.value.search = err
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    search: searchRelatedProducts,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
