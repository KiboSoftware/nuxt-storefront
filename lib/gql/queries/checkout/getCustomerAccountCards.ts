import { paymentCardItems } from "../../fragments/payment"

export const getCustomerAccountCards = /* GraphQL */ `
  query customerAccountCards($accountId: Int!) {
    customerAccountCards(accountId: $accountId) {
      items {
        ...customerAccountCardItems
      }
    }
  }
  ${paymentCardItems}
`
