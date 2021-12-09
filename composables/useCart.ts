import { updateCartQuantityMutation } from "./../gql/mutations/cart/updateCartMutation"
import { useNuxtApp, useState } from "#app"
import { getCartQuery } from "@/gql/queries/cart"
import { addToCartMutation } from "@/gql/mutations"
import { deleteCartItemMutation } from "@/gql/mutations/cart/deleteCartItemMutation"

export const useCart = () => {
  const cart = useState(`use-cart-result`, () => {
    return {}
  })
  const loading = useState(`use-cart-loading`, () => false)
  const error = useState(`use-cart-error`, () => null)
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const getCart = async (): Promise<Object> => {
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

  const addToCart = async (params: { product: Object; quantity: number }) => {
    try {
      loading.value = true
      const { product, quantity } = params
      const productToAdd = {
        product,
        quantity,
      }
      await fetcher({
        query: addToCartMutation,
        variables: { productToAdd },
      })
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
        query: updateCartQuantityMutation,
        variables,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
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

  return {
    loading,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    load,
    cart,
    error,
  }
}
