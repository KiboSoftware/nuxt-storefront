import { computed } from "@vue/composition-api"
import { getShippingRatesQuery } from "@/gql/queries"
import type { Maybe, ShippingRate } from "@/server/types/GraphQL"

export const useShippingMethods = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const shippingMethods = useState<Maybe<Array<ShippingRate>>>(
    `use-shipping-methods-result`,
    () => null
  )
  const loading = useState<Boolean>(`use-shipping-methods-loading`, () => false)
  const error = useState(`use-shipping-methods-error`, () => null)
  const load = async (checkoutId: String) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: getShippingRatesQuery,
        variables: { checkoutId },
      })
      shippingMethods.value = response?.data?.orderShipmentMethods
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  return {
    shippingMethods,
    load,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
