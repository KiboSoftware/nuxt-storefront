import { useState, useNuxtApp } from "#app"
import { getSpLocations } from "~~/gql/queries/spLocations"
import { Location } from "~~/server/types/GraphQL"

export const useStoreLocations = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const locations = useState(`use-storeLocations`, (): Location[] => {
    return [] as Location[]
  })
  const loading = useState(`use-storeLocations-loading`, () => false)
  const error = useState(`use-storeLocations-error`, () => null)

  const search = async () => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getSpLocations,
      })
      locations.value = response.data.spLocations.items
    } catch (error) {
      loading.value = false
    }
    loading.value = false
  }

  return {
    locations,
    search,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
