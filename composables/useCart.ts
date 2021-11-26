import { useNuxtApp, useState } from "#app"
import { getCartQuery } from "~~/gql/queries/cart"
import { addToCartMutation } from "~~/gql/mutations"

export const useCart = () => {
  const cart = useState(`use-cart-result`, () => {
    return {}
  })
  const loading = useState(`use-cart-result`, () => false)
  const error = useState(`use-cart-result`, () => null)
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
      console.error(error)
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
      cart.value = await getCart()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    addToCart,
    load,
    cart,
    error,
  }
}
