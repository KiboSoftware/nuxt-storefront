import { computed } from "@vue/composition-api"
import { buildSearchOrdersVars } from "./helpers/buildSearchOrdersVars"
import { getOrdersQuery } from "@/lib/gql/queries"
import { useState, useNuxtApp } from "#app"
import type { Maybe, OrderCollection } from "@/server/types/GraphQL"

export const useUserOrder = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const result = useState<Maybe<OrderCollection>>(
    `use-userOrders-result-${referenceKey}`,
    () => null
  )
  const loading = useState<Boolean>(`use-userOrders-loading-${referenceKey}`, () => false)
  const error = useState(`use-userOrders-error-${referenceKey}`, () => null)

  const search = async (params: {
    filters?: Array<string> | string
    startIndex?: number
    pageSize?: number
  }) => {
    try {
      loading.value = true
      const { filters } = params
      const variables = buildSearchOrdersVars({
        filters,
      })
      const ordersSearchResponse = await fetcher({
        query: getOrdersQuery,
        variables,
      })
      result.value = ordersSearchResponse?.data?.orders
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
