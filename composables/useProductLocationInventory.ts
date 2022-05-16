import { computed } from "@vue/composition-api"
import { useState, useNuxtApp } from "#app"
import { productLocationInventoryQuery } from "@/lib/gql/queries"
import type { LocationInventory } from "@/server/types/GraphQL"

export const useProductLocationInventory = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const productInventory = useState<LocationInventory[]>(`use-product-location-inventory`, () => [])
  const loading = useState<Boolean>(`use-product-location-inventory-loading`, () => false)
  const error = useState(`use-product-location-inventory-error`, () => null)

  const load = async (productCode: string, locationCodes: string) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: productLocationInventoryQuery,
        variables: { productCode, locationCodes },
      })
      loading.value = false
      productInventory.value = response.data?.productLocationInventory?.items
    } catch (error) {
      productInventory.value = []
      console.error(error)
      loading.value = false
    }
  }

  return {
    productInventory,
    load,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
