import { ref, computed } from "@vue/composition-api"
import { categoryTreeQuery } from "../gql/queries"
import { selectCategoryFromTree } from "./helpers/selectCategoryFromTree"
import { useState, useNuxtApp } from "#app"

export const useFacet = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const result = ref({})
  const loading = useState(`use-category-loading-${referenceKey}`, () => false)
  const error = useState(`use-category-error-${referenceKey}`, () => null)
  const categories = ref()
  const search = async (params: { categoryCode: string }) => {
    try {
      loading.value = true
      const { categoryCode } = params
      const categoryTree = useState(`use-category-${referenceKey}`, () => {
        return []
      })
      const response = await fetcher({
        query: categoryTreeQuery,
        variables: { categoryCode },
      })
      categoryTree.value = response?.data?.categoriesTree?.items
      if (categoryCode && categoryTree) {
        const category = selectCategoryFromTree(categoryTree.value, categoryCode)
        response.data.categoriesTree.items = category ? [category] : []
      }
      categories.value = response.data.categoriesTree.items
      result.value = { categories }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
