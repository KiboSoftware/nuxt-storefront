import { useState } from "#app"

export interface ILocation {
  longitude: string
  latitude: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCurrentPosition = (): Promise<any> =>
  new Promise((resolve, reject) => window.navigator.geolocation.getCurrentPosition(resolve, reject))

export const useCurrentLocation = () => {
  const currentLocation = useState(`use-current-location`, (): ILocation => {
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
        const response: { coords: ILocation } = await getCurrentPosition()
        currentLocation.value = {
          latitude: String(response.coords.latitude),
          longitude: String(response.coords.longitude),
        }
        loading.value = false
      } catch (reject) {
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
