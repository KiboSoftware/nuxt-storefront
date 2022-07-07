import { computed } from "@vue/composition-api"
import { createReturnItemMutation } from "@/lib/gql/mutations"
import { useState, useNuxtApp } from "#app"
import type { Maybe, ReturnCollection } from "@/server/types/GraphQL"

export const useReturnItems = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const returnItem = useState<Maybe<ReturnCollection>>(
    `use-useReturnItems-result-${referenceKey}`,
    () => null
  )
  const loading = useState<Boolean>(`use-useReturnItems-loading-${referenceKey}`, () => false)
  const error = useState(`use-useReturnItems-error-${referenceKey}`, () => null)

  const buildReturnItems = ({ items, returnType, reason, notes }) =>
    items.map((item) => {
      return {
        product: item.product,
        quantityReceived: item.quantity,
        quantityShipped: item.quantity,
        quantityRestockable: item.quantity,
        quantityRestocked: item.quantity,
        quantityRefunded: 0,
        orderLineId: item.lineId,
        returnType,
        orderItemOptionAttributeFQN: "",
        excludeProductExtras: false,
        reasons: {
          reason,
          quantity: item.quantity,
        },
        // notes,
      }
    })

  const createReturnItem = async (params) => {
    const { returnType, reason, notes, originalOrderId, items, locationCode } = params
    const returnItems = buildReturnItems({ items, returnType, reason, notes })
    const returnItemParams = {
      returnType,
      originalOrderId,
      items: returnItems,
      locationCode,
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

  return {
    createReturnItem,
    returnItem,
    loading,
    error: computed(() => error.value),
  }
}
