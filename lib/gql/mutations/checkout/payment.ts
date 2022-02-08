import { paymentCardItems } from "../../fragments/payment"
import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
} from "../../fragments"

const addPaymentCard = /* GraphQL */ `
  mutation addPaymentMethod($orderId: String!, $paymentAction: PaymentActionInput) {
    createOrderPaymentAction(orderId: $orderId, paymentActionInput: $paymentAction) {
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

const updatePaymentCard = /* GraphQL */ `
  mutation updateCustomerAccountCard($accountId: Int!, $cardId: String!, $cardInput: CardInput) {
    updateCustomerAccountCard(accountId: $accountId, cardId: $cardId, cardInput: $cardInput) {
      ...customerAccountCardItems
    }
  }
  ${paymentCardItems}
`

const deletePaymentCard = /* GraphQL */ `
  mutation deleteCustomerAccountCard($accountId: Int!, $cardId: String!) {
    deleteCustomerAccountCard(accountId: $accountId, cardId: $cardId)
  }
`

export { addPaymentCard, updatePaymentCard, deletePaymentCard }
