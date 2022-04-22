import {
  removeClientCookie,
  storeClientCookie,
  decodeParseCookieValue,
} from "@/composables/helpers/cookieHelper"
import { useState, useNuxtApp } from "#app"
import { getSpLocations } from "@/lib/gql/queries"
import { Location } from "@/server/types/GraphQL"

export const usePurchaseLocation = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const app = nuxt.nuxt2Context.app
  const purchaseLocationCookieName = nuxt.nuxt2Context.$config.storeLocationCookie
  const purchaseLocation = useState<Location>(`use-purchaseLocation`, () => ({}))
  const loading = useState<Boolean>(`use-purchaseLocation-loading`, () => false)
  const error = useState(`use-purchaseLocation-error`, () => null)

  const load = async () => {
    const locationCookieValue = app.$cookies.get(purchaseLocationCookieName)
    if (locationCookieValue) {
      try {
        loading.value = true
        const response = await fetcher({
          query: getSpLocations,
          variables: {
            filter: `code eq ${decodeParseCookieValue(locationCookieValue)}`,
          },
        })
        purchaseLocation.value = response.data.spLocations.items[0]
      } catch (error) {
        purchaseLocation.value = {}
        loading.value = false
      }
    }
    loading.value = false
  }

  const set = (locationCode: string | null) => {
    if (locationCode === null) {
      removeClientCookie(purchaseLocationCookieName)
    }
    storeClientCookie(purchaseLocationCookieName, locationCode as string)
  }

  return {
    purchaseLocation,
    load,
    set,
    loading,
    error,
  }
}
