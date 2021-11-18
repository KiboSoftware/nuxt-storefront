import { removeClientCookie, storeClientCookie } from "../helpers/cookieHelper"
import { useState, useNuxtApp } from "#app"
import { Location } from "~~/server/types/GraphQL"
import { getSpLocations } from "~~/gql/queries/spLocations"

const LOCATION_COOKIE = "kibo_purchase_location"

export const usePurchaseLocation = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const app = nuxt.nuxt2Context.app

  const purchaseLocation = useState(`use-purchaseLocation`, (): Location => {
    return {
      name: "Select My Store",
    } as Location
  })
  const loading = useState(`use-purchaseLocation-loading`, () => false)
  const error = useState(`use-purchaseLocation-error`, () => null)

  const load = async () => {
    const locationCookieValue = app.$cookies.get(LOCATION_COOKIE)
    if (locationCookieValue) {
      try {
        loading.value = true
        const response = await fetcher({
          query: getSpLocations,
          variable: {
            filter: `code eq ${locationCookieValue}`,
          },
        })
        purchaseLocation.value = response.data.spLocations.items[0]
      } catch (error) {
        loading.value = false
      }
    }
    loading.value = false
  }

  const set = (locationCode: string | null) => {
    if (locationCode === null) {
      removeClientCookie(LOCATION_COOKIE)
    }
    storeClientCookie(LOCATION_COOKIE, locationCode as string)
  }

  return {
    purchaseLocation,
    load,
    set,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
