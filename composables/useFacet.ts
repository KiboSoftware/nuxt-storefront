import { ref, computed } from "@vue/composition-api"
import { categoryTreeQuery } from "../gql/queries"
import { selectCategoryFromTree } from "./helpers/selectCategoryFromTree"
import { useState, useNuxtApp } from "#app"

export const useFacet = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  // const result = useState(`use-facet-result-${referenceKey}`, () => {return {}})
  const result = ref({})
  const loading = useState(`use-facet-loading-${referenceKey}`, () => false)
  const error = useState(`use-facet-error-${referenceKey}`, () => null)
  const search = async (params: { categoryCode: string }) => {
    try {
      loading.value = true
      const { categoryCode } = params
      const response = await fetcher({
        query: categoryTreeQuery,
        variables: { categoryCode },
      })
      const categoryTree = response?.data?.categoriesTree?.items
      if (categoryCode && categoryTree) {
        const category = selectCategoryFromTree(categoryTree, categoryCode)
        response.data.categoriesTree.items = category ? [category] : []
      }
      const categories = response?.data?.categoriesTree?.items
      result.value = { categories }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  return {
    search,
    result,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
