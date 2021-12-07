import { computed } from "@vue/composition-api"
import { buildProductSearchVars } from "./helpers/buildProductSearchVars"
import { searchProductsQuery } from "@/gql/queries"
import { useState, useNuxtApp } from "#app"

export const useProductSearch = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const result = useState(`use-productSearch-result-${referenceKey}`, () => {
    return {}
  })

  const loading = useState(`use-productSearch-loading-${referenceKey}`, () => false)
  const error = useState(`use-productSearch-error-${referenceKey}`, () => null)
  const search = async (params: { categoryCode: string }) => {
    try {
      loading.value = true
      const { categoryCode } = params
      const variables = buildProductSearchVars({ categoryCode })
      const productSearchResponse = await fetcher({
        query: searchProductsQuery,
        variables,
      })
      const { facets, items, totalCount } = productSearchResponse?.data?.products
      result.value = { facets, items, totalCount }
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
