import { computed } from "@vue/composition-api"
import { useState, useNuxtApp } from "#app"
import { getUserAddressesQuery } from "@/lib/gql/queries"
import {
  addUserAddressMutation,
  updateUserAddressMutation,
  deleteUserAddressMutation,
} from "@/lib/gql/mutations"
import type {
  AddUserAddressParams,
  UpdateUserAddressParams,
  DeleteUserAddressParams,
} from "@/server/types/Api"
import type { Maybe, CustomerContact } from "@/server/types/GraphQL"

export const useUserAddresses = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const userShippingAddresses = useState<Maybe<Array<CustomerContact>>>(
    `use-user-shipping-addresses`,
    () => []
  )
  const userBillingAddresses = useState<Maybe<Array<CustomerContact>>>(
    `use-user-billing-addresses`,
    () => []
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
  const addUserAddress = async (params: AddUserAddressParams) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: addUserAddressMutation,
        variables: params,
      })
      return response?.data?.createCustomerAccountContact
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const updateUserAddress = async (params: UpdateUserAddressParams) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: updateUserAddressMutation,
        variables: params,
      })
      return response?.data?.updateCustomerAccountContact
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const deleteUserAddress = async (params: DeleteUserAddressParams) => {
    loading.value = true
    try {
      await fetcher({
        query: deleteUserAddressMutation,
        variables: params,
      })
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
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    error: error.value,
    loading: computed(() => loading.value),
  }
}
