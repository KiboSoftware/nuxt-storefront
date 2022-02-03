import { useCart } from "@/composables/useCart"
import {
  updateCartItemQuantityMutation,
  addToCartMutation,
  deleteCartItemMutation,
  updateCartItemMutation,
} from "@/lib/gql/mutations"
import { getCartQuery } from "@/lib/gql/queries"
import { CartItemInput } from "~~/server/types/GraphQL"

const mockedAddToCartMutation = addToCartMutation
const mockedGetCartQuery = getCartQuery
const mockedUpdateCartItemQuantityMutation = updateCartItemQuantityMutation
const mockedDeleteCartItemMutation = deleteCartItemMutation
const mockedUpdateCartItemMutation = updateCartItemMutation

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
              product: {
                productCode: "mocked-current-cart",
                variationProductCode: "",
                options: undefined,
              },
              quantity: 1,
              fulfillmentMethod: "Ship",
              purchaseLocation: "Austin",
            },
          })
        }
        if (query === mockedUpdateCartItemQuantityMutation) {
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
        if (query === mockedUpdateCartItemMutation) {
          expect(variables).toStrictEqual({
            cartItemId: "mock-cart-item-id",
            cartItemInput: {
              id: "mock-cart-item-input-id",
            },
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

  test("addItemsToCart: should add item to cart", async () => {
    const { cart, addItemsToCart, error, loading } = useCart()
    const addToCartVariables = {
      product: {
        productCode: "mocked-current-cart",
        variationProductCode: "",
        options: undefined,
      },
      quantity: 1,
      fulfillmentMethod: "Ship",
      purchaseLocation: "Austin",
    }

    await addItemsToCart(addToCartVariables)
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

  test("updateCartItem: should update a cart item", async () => {
    const { updateCartItem, loading, error } = useCart()
    const cartItemId = "mock-cart-item-id"
    const cartItemInput = {
      id: "mock-cart-item-input-id",
    } as CartItemInput
    await updateCartItem(cartItemId, cartItemInput)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })
})
