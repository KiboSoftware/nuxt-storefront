import { baseCheckoutFragment, checkoutLineItemFragment } from "../../fragments"

export const getOrCreateCheckoutFromCartMutation = /* GraphQL */ `
  mutation getOrCreateCheckoutFromCart($cartId: String!) {
    checkout: createOrder(cartId: $cartId) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
`
