import { getUserAddressesQuery } from "@/lib/gql/queries"
import type { Maybe, CustomerContact } from "@/server/types/GraphQL"
import { useState, useNuxtApp } from "#app"

export const useUserAddresses = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const userShippingAddresses = useState<Maybe<Array<CustomerContact>>>(`use-user-shipping-addresses`, () => null)
  const userBillingAddresses = useState<Maybe<Array<CustomerContact>>>(`use-user-billing-addresses`, () => null)

  const loading = useState<Boolean>(`use-user-address-loading`, () => false)
  const error = useState(`use-shipping-methods-error`, () => null)

  const load = async (accountId: number) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: getUserAddressesQuery,
        variables: { accountId },
      })

      const items = response?.data?.customerAccountContacts?.items

      enum Types {
        SHIPPING = "shipping",
        BILLING = "billing",
      }

      userShippingAddresses.value = items?.filter(
        (item) => item?.types[0].name.toLowerCase() === Types.SHIPPING
      )
      userBillingAddresses.value = items?.filter(
        (item) => item?.types[0].name.toLowerCase() === Types.BILLING
      )
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    userShippingAddresses,
    userBillingAddresses,
    load,
    error: error.value,
    loading: loading.value,
  }
}
