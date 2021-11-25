import { computed } from "@vue/composition-api"
import { Location, GeoCoords } from "@/composables/types"
import { getSpLocations } from "@/gql/queries/spLocations"
import { useState, useNuxtApp } from "#app"

export const useStoreLocations = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const locations = useState(`use-storeLocations`, (): Location[] => {
    return [] as Location[]
  })
  const loading = useState(`use-storeLocations-loading`, () => false)
  const error = useState(`use-storeLocations-error`, () => null)

  const search = async (coords?: GeoCoords) => {
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
