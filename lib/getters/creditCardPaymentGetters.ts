const getCardNumberMask = (tokenizedData): string => tokenizedData?.numberPart || ""
const getId = (tokenizedData) => tokenizedData?.id || ""

const getPaymentType = (selectedType: string) => {
  let paymentType
  switch (selectedType.toLowerCase()) {
    case "creditcard":
      paymentType = "CreditCard"
      break

    case "checkbymail":
      paymentType = "Check"
      break

    default:
      break
  }
  return paymentType
}

const getExpireMonth = (cardDetails): number => parseInt(cardDetails?.expiryDate.split("/")[0]) || 0

const getExpireYear = (cardDetails): number => parseInt(cardDetails?.expiryDate.split("/")[1]) || 0

const getNameOnCard = (cardDetails) => cardDetails?.nameOnCard

const getAppliedTotal = (checkout) => checkout?.total

const getCardDetailsWithBilling = (cards, billingAddresses) => {
  return cards?.map((c) => {
    return {
      card: { ...c },
      billingAddress: { ...billingAddresses.find((ba) => ba.id === c.contactId) },
    }
  })
}

export const creditCardPaymentGetters = {
  getCardNumberMask,
  getId,
  getAppliedTotal,
  getPaymentType,
  getExpireMonth,
  getExpireYear,
  getNameOnCard,
  getCardDetailsWithBilling,
}
