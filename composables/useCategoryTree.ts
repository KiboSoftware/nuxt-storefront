import { computed } from "@vue/composition-api"
import { categoryTreeQuery } from "@/lib/gql/queries"
import type { PrCategory } from "@/server/types/GraphQL"
import * as types from "@/composables/types"
import { useNuxtApp, useState } from "#app"

export const useCategoryTree = (): types.UseCategoryTreeResponse => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const categories = useState<Array<PrCategory>>(`use-category-tree-categories`, () => [])

  const loading = useState(`use-category-tree-loading`, () => false)
  const error = useState(`use-category-tree-error`, () => null)

  // load
  const load = async () => {
    try {
      loading.value = true
      const response = await fetcher({
        query: categoryTreeQuery,
        variables: {},
      })
      categories.value = response.data.categoriesTree.items
      error.value = null
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  return {
    load,
    categories,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
