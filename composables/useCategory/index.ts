/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from "@vue/composition-api"
// import * as GraphQL from "../../server/types/GraphQL"
// import * as types from "../types"

// --------------- useCategory
export const useCategory = () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref()

  // load
  const load = async () => {
    try {
      loading.value = true
      const categoriesResponse = await fetch(`/api/category/category`)
      const categoryData = await categoriesResponse.json()
      categories.value = categoryData.data.categoriesTree.items
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
