import { computed } from "@vue/composition-api"
import { buildProductSearchVars } from "./helpers/buildProductSearchVars"
import { searchProductsQuery } from "@/gql/queries"
import { useState, useNuxtApp } from "#app"

export const useProductSearch = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const result = useState(`use-productSearch-result-${referenceKey}`, () => {
    return null
  })

  const loading = useState(`use-productSearch-loading-${referenceKey}`, () => false)
  const error = useState(`use-productSearch-error-${referenceKey}`, () => null)
  const search = async (params: {
    categoryCode?: string
    filters?: {}
    page?: number
    itemsPerPage?: number
    phrase?: string
    sort?: string
  }) => {
    try {
      loading.value = true
      const { categoryCode, filters } = params
      const variables = buildProductSearchVars({ categoryCode, filters })
      const productSearchResponse = await fetcher({
        query: searchProductsQuery,
        variables,
      })
      result.value = productSearchResponse?.data?.products
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  return {
    search,
    result,
    loading,
    error: computed(() => error.value),
  }
}
