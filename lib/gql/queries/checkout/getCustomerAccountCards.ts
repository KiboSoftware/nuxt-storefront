import { paymentCardItems } from "../../fragments/payment"

export const getCustomerAccountCards = /* GraphQL */ `
  query customerAccountCards($accountId: Int) {
    items {
      ...paymentCardItems
    }
    totalCount: Int!
  }
  ${paymentCardItems}
`
