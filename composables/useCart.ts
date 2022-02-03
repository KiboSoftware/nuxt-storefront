import { CartItemInput } from "./../server/types/GraphQL"
import { useNuxtApp, useState } from "#app"
import { getCartQuery } from "@/lib/gql/queries"
import {
  addToCartMutation,
  deleteCartItemMutation,
  updateCartItemQuantityMutation,
  updateCartItemMutation,
} from "@/lib/gql/mutations"
import type { Cart, Maybe } from "@/server/types/GraphQL"

export const useCart = () => {
  const cart = useState<Maybe<Cart>>(`use-cart-result`, () => {
    return {}
  })
  const loading = useState<Boolean>(`use-cart-loading`, () => false)
  const newestCartItemId = useState<string>(`use-newest-cart-item`, () => null)
  const error = useState(`use-cart-error`, () => null)
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const getCart = async (): Promise<Cart> => {
    const cartResponse = await fetcher({
      query: getCartQuery,
    })
    return cartResponse.data.currentCart
  }

  const load = async () => {
    try {
      loading.value = true
      cart.value = await getCart()
    } catch (error) {
      cart.value = {}
    } finally {
      loading.value = false
    }
  }

  const addItemsToCart = async (productToAdd) => {
    try {
      loading.value = true

      const response = await fetcher({
        query: addToCartMutation,
        variables: { productToAdd },
      })
      newestCartItemId.value = response?.data?.addItemToCurrentCart?.id
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
      cart.value = await getCart()
    }
  }

  const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
    const variables = {
      itemId: cartItemId,
      quantity,
    }

    try {
      loading.value = true
      await fetcher({
        query: updateCartItemQuantityMutation,
        variables,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
      cart.value = await getCart()
    }
  }

  const removeCartItem = async (cartItemId: string) => {
    const variables = {
      itemId: cartItemId,
    }
    try {
      loading.value = true
      await fetcher({
        query: deleteCartItemMutation,
        variables,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
      cart.value = await getCart()
    }
  }

  const updateCartItem = async (cartItemId: string, cartItemInput: CartItemInput) => {
    const variables = {
      cartItemId,
      cartItemInput,
    }
    try {
      loading.value = true
      await fetcher({
        query: updateCartItemMutation,
        variables,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
      cart.value = await getCart()
    }
  }

  return {
    loading,
    addItemsToCart,
    updateCartItemQuantity,
    removeCartItem,
    load,
    cart,
    error,
    newestCartItemId,
    updateCartItem,
  }
}
