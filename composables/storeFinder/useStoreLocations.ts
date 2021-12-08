import { Location, GeoCoords } from "@/composables/types"
import { getSpLocations } from "@/gql/queries/spLocations"
import { useState, useNuxtApp } from "#app"

export const useStoreLocations = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const locations = useState(`use-storeLocations`, (): Location[] | null => {
    return [] as Location[]
  })
  const loading = useState(`use-storeLocations-loading`, () => false)
  const error = useState(`use-storeLocations-error`, () => null)

  const search = async (param: GeoCoords | string) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getSpLocations,
        ...(typeof param === "string"
          ? {
              variables: { filter: `geo near(${param},160934)` },
            }
          : {
              variables: { filter: `geo near(${param?.latitude},${param?.longitude},160934)` },
            }),
      })
      locations.value = response.data.spLocations.items
    } catch (error) {
      locations.value = null
      loading.value = false
    }
    loading.value = false
  }

  return {
    locations,
    search,
    loading: loading.value,
    error: error.value,
  }
}
