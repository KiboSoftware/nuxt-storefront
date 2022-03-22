import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from "../../fragments"

export const getOrCreateCheckoutFromCartMutation = /* GraphQL */ `
  mutation getOrCreateCheckoutFromCart($cartId: String!) {
    checkout: createOrder(cartId: $cartId) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${checkoutPaymentFragment}
`
