import { computed } from "@vue/composition-api"
import { createReturnItemMutation } from "@/lib/gql/mutations"
import type { Maybe, ReturnObj } from "@/server/types/GraphQL"
import { useState, useNuxtApp } from "#app"

export const useReturn = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const returnItem = useState<Maybe<ReturnObj>>(`use-return-item`, () => null)
  // const isAuthenticated = useState<Boolean>(`use-user-isAuthenticated`, () => false)
  const loading = useState<Boolean>(`use-user-loading`, () => false)

  // createReturn should consist the returned item object
  const createReturnItem = async (params) => {
    const item = [
      {
        product: params.item.product,
        quantityReceived: params.item.quantity,
        quantityShipped: params.item.quantity,
        quantityRestockable: params.item.quantity,
        quantityRestocked: params.item.quantity,
        quantityRefunded: 0,
        orderLineId: params.item.lineId,
        returnType: params.returnType,
        orderItemOptionAttributeFQN: "",
        excludeProductExtras: false,
        reasons: {
          reason: params.reason,
          quantity: params.item.quantity,
        },
      },
    ]
    const returnItemParams = {
      returnType: params.returnType,
      originalOrderId: params.orderId,
      items: item,
      locationCode: params.locationCode,
    }

    const variables = {
      returnObjInput: returnItemParams,
    }
    try {
      loading.value = true
      const response = await fetcher({
        query: createReturnItemMutation,
        variables,
      })
      returnItem.value = response.data?.createReturn
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    returnItem,
    // isAuthenticated,
    createReturnItem,
    loading: computed(() => loading.value),
  }
}
