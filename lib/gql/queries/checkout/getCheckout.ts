import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
} from "../../fragments"

export const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($checkoutId: String!) {
    checkout: order(orderId: $checkoutId) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      fulfillmentInfo {
        ...fullfillmentInfoFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${fullfillmentInfoFragment}
`
