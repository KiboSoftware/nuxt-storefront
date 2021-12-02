import { computed } from "@vue/composition-api"
import { Location } from "@/composables/types"
import { removeClientCookie, storeClientCookie } from "@/composables/helpers/cookieHelper"
import { useState, useNuxtApp } from "#app"
import { getSpLocations } from "@/gql/queries/spLocations"

export const usePurchaseLocation = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const app = nuxt.nuxt2Context.app
  const storeLocationCookie = nuxt.nuxt2Context.$config.storeLocationCookie
  const purchaseLocation = useState(`use-purchaseLocation`, (): Location => {
    return {} as Location
  })
  const loading = useState(`use-purchaseLocation-loading`, () => false)
  const error = useState(`use-purchaseLocation-error`, () => null)

  const load = async () => {
    const locationCookieValue = app.$cookies.get(storeLocationCookie)
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
        purchaseLocation.value = {}
        loading.value = false
      }
    }
    loading.value = false
  }

  const set = (locationCode: string | null) => {
    if (locationCode === null) {
      removeClientCookie(storeLocationCookie)
    }
    storeClientCookie(storeLocationCookie, locationCode as string)
  }

  return {
    purchaseLocation,
    load,
    set,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
