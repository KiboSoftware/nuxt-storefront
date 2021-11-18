import { ILocation } from "./useCurrentLocation"
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

  const search = async (coords?: ILocation) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getSpLocations,
        ...(coords && {
          variables: { filter: `geo near(${coords?.latitude},${coords?.longitude},160934)` },
        }),
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
