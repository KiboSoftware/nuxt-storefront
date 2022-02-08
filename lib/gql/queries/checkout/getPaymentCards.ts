import { paymentCardItems } from "../../fragments/payment"

export const getPaymentCards = /* GraphQL */ `
  query customerAccountCards($accountId: Int) {
    items {
      ...paymentCardItems
    }
    totalCount: Int!
  }
  ${paymentCardItems}
`
