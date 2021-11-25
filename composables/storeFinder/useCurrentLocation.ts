import { computed } from "@vue/composition-api"
import { getCurrentUserPosition } from "./utils/getUserCurrentPosition"
import { GeoCoords } from "@/composables/types"
import { useState } from "#app"

export const useCurrentLocation = () => {
  const currentLocation = useState(`use-current-location`, (): GeoCoords => {
    return {
      latitude: "",
      longitude: "",
    }
  })
  const loading = useState(`use-current-location-loading`, () => false)
  const error = useState(`use-current-location-error`, (): string | null => null)
  const loadWithNavigator = async () => {
    if (process.browser) {
      loading.value = true
      try {
        const response: { coords: GeoCoords } = await getCurrentUserPosition()
        currentLocation.value = {
          latitude: String(response.coords.latitude),
          longitude: String(response.coords.longitude),
        }
        loading.value = false
      } catch (err) {
        error.value = err instanceof GeolocationPositionError ? err.message : null
        loading.value = false
      }
    }
  }

  return {
    currentLocation,
    loadWithNavigator,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
