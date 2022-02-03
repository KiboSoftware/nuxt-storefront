import { billingContactFragment } from "../../fragments"

export const setBillingInfoMutation = /* GraphQL */ `
  mutation setBillingInformation($orderId: String!, $billingInfoInput: BillingInfoInput) {
    updateOrderBillingInfo(orderId: $orderId, billingInfoInput: $billingInfoInput) {
      ...billingContactFragment
    }
  }

  ${billingContactFragment}
`
