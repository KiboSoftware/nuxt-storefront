import { computed } from "@vue/composition-api"
import {
  getOrCreateCheckoutFromCartMutation,
  setShippingInfoMutation,
  updateOrder,
} from "@/lib/gql/mutations"
import { getCheckoutQuery } from "@/lib/gql/queries"
import { useState, useNuxtApp } from "#app"
import type { Checkout, Maybe } from "@/server/types/GraphQL"

export const useCheckout = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const checkout = useState<Maybe<Checkout>>(`use-checkout-result`, () => null)
  const loading = useState<Boolean>(`use-checkout-loading`, () => false)
  const error = useState(`use-checkout-error`, () => null)

  const getOrCreateCheckout = async ({
    cartId,
    checkoutId,
  }: {
    cartId?: String
    checkoutId?: String
  }) => {
    loading.value = true
    try {
      const query = cartId ? getOrCreateCheckoutFromCartMutation : getCheckoutQuery
      const variables = cartId ? { cartId } : { checkoutId }
      const response = await fetcher({
        query,
        variables,
      })
      checkout.value = response?.data?.checkout
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const load = async (checkoutId: String) => await getOrCreateCheckout({ checkoutId })
  const loadFromCart = async (cartId: String) => await getOrCreateCheckout({ cartId })

  const setPersonalInfo = async (variables) => {
    loading.value = true
    try {
      await fetcher({
        query: updateOrder,
        variables,
      })
      await load(checkout.value.id)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const setShippingInfo = async (variables) => {
    loading.value = true
    try {
      await fetcher({
        query: setShippingInfoMutation,
        variables,
      })
      await load(checkout?.value?.id)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  const setBillingInfo = async () => {}
  const submit = async () => {}

  return {
    checkout,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load,
    loadFromCart,
    setShippingInfo,
    setPersonalInfo,
    setBillingInfo,
    submit,
  }
}
