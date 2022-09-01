import { computed } from "@vue/composition-api"
import { createOrderMutation } from "@/lib/gql/mutations"
import { useState, useNuxtApp } from "#app"

export const useCreateOrder = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const loading = useState<Boolean>(`use-useCreateOrder-loading`, () => false)
  const error = useState(`use-useCreateOrder-error`, () => null)

  const buildMakeOrderVars = (params) => {
    return { orderId: params.orderId, orderActionInput: { actionName: "SubmitOrder" } }
  }

  const createOrder = async (params) => {
    const variables = buildMakeOrderVars(params)
    try {
      loading.value = true
      const response = await fetcher({
        query: createOrderMutation,
        variables,
      })
      return response?.data?.createOrderAction
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    createOrder,
    loading,
    error: computed(() => error.value),
  }
}
