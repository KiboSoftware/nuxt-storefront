import { computed } from "@vue/composition-api"
import { buildOrdersFilterInput } from "./helpers/buildOrdersFilterInput"
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

  const getOrders = async (params: {
    orderNumber?: string
    billingEmail?: string
    filters?: string | string[]
  }) => {
    try {
      loading.value = true
      const { orderNumber, billingEmail, filters } = params
      const variables = buildOrdersFilterInput({
        filters,
        orderNumber,
        billingEmail,
      })
      const ordersResponse = await fetcher({
        query: getOrdersQuery,
        variables,
      })
      result.value = ordersResponse?.data?.orders
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  return {
    getOrders,
    result,
    loading,
    error: computed(() => error.value),
  }
}
