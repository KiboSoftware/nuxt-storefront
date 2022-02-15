export const paymentCardItems = /* GraphQL */ `
  fragment customerAccountCardItems on CardItem {
    id
    nameOnCard
    cardType
    expireMonth
    expireYear
    cardNumberPart
    contactId
    isDefaultPayMethod
  }
`
