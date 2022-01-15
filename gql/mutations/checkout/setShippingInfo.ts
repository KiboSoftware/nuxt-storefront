import { fullfillmentInfoFragment } from "../../fragments"

export const setShippingInfoMutation = /* GraphQL */ `
  mutation setShippingInformation($orderId: String!, $fulfillmentInfoInput: FulfillmentInfoInput) {
    updateOrderFulfillmentInfo(orderId: $orderId, fulfillmentInfoInput: $fulfillmentInfoInput) {
      ...fullfillmentInfoFields
    }
  }

  ${fullfillmentInfoFragment}
`
