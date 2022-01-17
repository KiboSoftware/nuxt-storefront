import { baseCheckoutFragment, checkoutLineItemFragment } from "../../fragments"

export const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($checkoutId: String!) {
    checkout: order(orderId: $checkoutId) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
`
