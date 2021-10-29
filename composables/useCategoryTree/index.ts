import { ref, computed } from "@vue/composition-api"
import { categoryApiHelper } from "../../utils/categoryTree"

const getCategoryApiPath = "/api/category-tree/index"

export const useCategory = () => {
  const categories = ref()
  const loading = ref(false)
  const error = ref()

  // load
  const load = async () => {
    try {
      loading.value = true
      const url = `${getCategoryApiPath}`
      const categoriesResponse = await categoryApiHelper.getCategoryTree(
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
