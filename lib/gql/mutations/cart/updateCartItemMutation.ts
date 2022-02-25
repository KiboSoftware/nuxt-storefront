import { cartItemDetails } from "./../../fragments/cart"
export const updateCartItemMutation = /* GraphQL */ `
  ${cartItemDetails}

  mutation updateCurrentCartItem($cartItemId: String!, $cartItemInput: CartItemInput) {
    updateCurrentCartItem(cartItemId: $cartItemId, cartItemInput: $cartItemInput) {
      ...cartItemDetails
    }
  }
`
