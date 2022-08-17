import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
  checkoutPaymentFragment,
} from "../../fragments"

export const createOrderMutation = /* GraphQL */ `
  mutation createOrderAction($orderId: String!, $orderActionInput: OrderActionInput) {
    createOrderAction(orderId: $orderId, orderActionInput: $orderActionInput) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      fulfillmentInfo {
        ...fullfillmentInfoFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${fullfillmentInfoFragment}
  ${checkoutPaymentFragment}
`
