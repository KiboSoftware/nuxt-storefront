import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useCart } from "@/composables"
import {
  updateCartQuantityMutation,
  addToCartMutation,
  deleteCartItemMutation,
} from "@/gql/mutations"
import { getCartQuery } from "@/gql/queries"

Vue.use(VueCompositionApi)

const mockedAddToCartMutation = addToCartMutation
const mockedGetCartQuery = getCartQuery
const mockedUpdateCartQuantityMutation = updateCartQuantityMutation
const mockedDeleteCartItemMutation = deleteCartItemMutation

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((param) => {
        const { query, variables } = param
        if (query === mockedGetCartQuery) {
          return {
            data: {
              currentCart: "mocked-current-cart",
            },
          }
        }
        if (query === mockedAddToCartMutation) {
          expect(variables).toStrictEqual({
            productToAdd: {
              product: "mocked-product",
              quantity: 1,
            },
          })
        }
        if (query === mockedUpdateCartQuantityMutation) {
          expect(variables).toStrictEqual({
            itemId: "mocked-cart-item-id",
            quantity: 1,
          })
          expect(variables.quantity).toEqual(expect.any(Number))
        }
        if (query === mockedDeleteCartItemMutation) {
          expect(variables).toStrictEqual({
            itemId: "mocked-cart-item-id",
          })
        }
      }),
    },
  }),
}))

describe("[composable] useCart", () => {
  test("load: should load current cart", async () => {
    const { cart, load, error, loading } = useCart()
    await load()
    expect(cart.value).toBe("mocked-current-cart")
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })

  test("addToCart: should add item to cart", async () => {
    const { cart, addToCart, error, loading } = useCart()
    await addToCart({ product: "mocked-product", quantity: 1 })
    expect(cart.value).toBe("mocked-current-cart")
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })

  test("updateCartItemQuantity: should update cart item quantity", async () => {
    const { updateCartItemQuantity, loading, error } = useCart()
    const cartItemId = "mocked-cart-item-id"
    const quantity = 1
    await updateCartItemQuantity(cartItemId, quantity)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })

  test("removeCartItem: should remove cart item", async () => {
    const { removeCartItem, loading, error } = useCart()
    const cartItemId = "mocked-cart-item-id"
    await removeCartItem(cartItemId)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })
})
