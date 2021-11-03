import type { Ref } from "@vue/composition-api"
import { ref, computed } from "@vue/composition-api"
import apiHelper from "../utils/apiHelper"
import * as types from "@/composables/types"

const getCategoryApiPath = "/api/category-tree/index"

export const useCategoryTree = (): types.UseCategoryTreeResponse => {
  const categories = ref()
  const loading = ref(false)
  const error = ref()

  // load
  const load = async () => {
    try {
      loading.value = true
      const url = `${getCategoryApiPath}`
      const categoriesResponse = await apiHelper.getCategoryTree("GET", url, {})
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
    allCategories: categories as Ref<{}>,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
