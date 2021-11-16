import { useState } from "#app"

interface ILocation {
  longitude: number
  latitude: number
}
export const useCurrentLocation = () => {
  const currentLocation = useState(`use-current-location`, (): ILocation => {
    return {
      latitude: 0,
      longitude: 0,
    }
  })
  const loading = useState(`use-current-location-loading`, () => false)
  const error = useState(`use-current-location-error`, (): string | null => null)
  const loadWithNavigator = () => {
    if (process.browser) {
      window.navigator.geolocation.getCurrentPosition(
        (response) => {
          currentLocation.value = {
            latitude: response.coords.latitude,
            longitude: response.coords.longitude,
          }
        },
        (err) => (error.value = err.message),
        {
          enableHighAccuracy: true,
        }
      )
    }
  }

  return {
    currentLocation,
    loadWithNavigator,
    loading,
    error,
  }
}
