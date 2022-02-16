import { computed } from "@vue/composition-api"
import { getUserAddressesQuery } from "@/lib/gql/queries"
import type { Maybe, CustomerContactCollection } from "@/server/types/GraphQL"
import { useState, useNuxtApp } from "#app"

export const useUserAddresses = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const addresses = useState<Maybe<Array<CustomerContactCollection>>>(
    `use-user-address-result`,
    () => null
  )

  const loading = useState<Boolean>(`use-user-address-loading`, () => false)
  const error = useState(`use-shipping-methods-error`, () => null)

  const load = async (accountId: number) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: getUserAddressesQuery,
        variables: { accountId },
      })
      addresses.value = response?.data?.customerAccountContacts?.items
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    addresses,
    load,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
