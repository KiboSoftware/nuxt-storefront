import { computed } from "@vue/composition-api"
import { buildProductSearchVars } from "./helpers/buildProductSearchVars"
import { searchProductsQuery } from "@/gql/queries"
import { useState, useNuxtApp } from "#app"
import type { Maybe, ProductSearchResult } from "@/server/types/GraphQL"

export const useProductSearch = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const result = useState<Maybe<ProductSearchResult>>(`use-productSearch-result-${referenceKey}`, () => null)
  const loading = useState<Boolean>(`use-productSearch-loading-${referenceKey}`, () => false)
  const error = useState(`use-productSearch-error-${referenceKey}`, () => null)
  
  const search = async (params: {
    categoryCode?: string
    filters?: Array<string>
    page?: number
    itemsPerPage?: number
    phrase?: string
    sort?: string
    filter?: string
  }) => {
    try {
      loading.value = true
      const { categoryCode, filters, filter, page, itemsPerPage, phrase, sort } = params
      const variables = buildProductSearchVars({
        categoryCode,
        filters,
        filter,
        startIndex: page,
        pageSize: itemsPerPage,
        search: phrase,
        sort,
      })
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
