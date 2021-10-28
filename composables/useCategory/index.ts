/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from "@vue/composition-api"
import { categoryApiHelper } from "../../utls/category"
import * as GraphQL from "../../server/types/GraphQL"

const getCategoryApiPath = "/api/category/category"

export const useCategory = () => {
  const categories = ref()
  const loading = ref(false)
  const error = ref()

  // load
  const load = async () => {
    try {
      loading.value = true
      const url = `${getCategoryApiPath}`
      const categoriesResponse = await categoryApiHelper.getCategory(
        "GET",
        url,
        {}
      )
      categories.value = categoriesResponse.data.categoriesTree.items
      error.value = null
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    load,
    allCategories: categories,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
