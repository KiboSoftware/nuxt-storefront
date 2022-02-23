import { getSpLocations } from "@/lib/gql/queries/spLocations"
import { useState, useNuxtApp } from "#app"
import { Location } from "@/server/types/GraphQL"

export const useStoreLocations = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const locations = useState(`storeLocations-${referenceKey}`, (): Location[] => {
    return [] as Location[]
  })
  const loading = useState(`storeLocations-loading-${referenceKey}`, () => false)
  const error = useState(`storeLocations-error-${referenceKey}`, () => null)

  const search = async (param: { filter: string }) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getSpLocations,
        variables: param,
      })
      locations.value = response.data.spLocations.items
    } catch (error) {
      locations.value = []
      loading.value = false
    }
    loading.value = false
  }

  return {
    locations,
    search,
    loading,
    error,
  }
}
