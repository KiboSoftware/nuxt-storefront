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

const getExpireDate = (cardDetails): String =>
  cardDetails?.expireMonth && cardDetails?.expireYear
    ? cardDetails?.expireMonth + "/" + cardDetails?.expireYear
    : ""

const getCardEndingDigits = (cardDetails): String =>
  cardDetails?.cardNumberPart ? "x" + cardDetails?.cardNumberPart?.slice(-4) : ""

const getExpireMonth = (cardDetails): number => parseInt(cardDetails?.expiryDate.split("/")[0]) || 0

const getExpireYear = (cardDetails): number => parseInt(cardDetails?.expiryDate.split("/")[1]) || 0

const getCardType = (cardDetails): String => {
  if (cardDetails?.cardType?.toLowerCase()?.includes("american")) return "AE"
  else if (cardDetails?.cardType?.toLowerCase()?.includes("discover")) return "DC"
  else if (cardDetails?.cardType?.toLowerCase()?.includes("master")) return "MC"
  else if (cardDetails?.cardType?.toLowerCase()?.includes("visa")) return "VISA"
  else return "CC"
}

const getNameOnCard = (cardDetails) => cardDetails?.nameOnCard

const getAppliedTotal = (checkout) => checkout?.total

const getCardDetailsWithBilling = (cards, billingAddresses) => {
  const result = cards?.map((c) => {
    return {
      card: { ...c },
      billingAddress: { ...billingAddresses.find((ba) => ba.id === c.contactId) },
    }
  })
  return result
}

const getSortedPaymentMethods = (paymentMethods) => {
  return paymentMethods
    ? paymentMethods?.sort((a, b) => b?.card?.isDefaultPayMethod - a?.card?.isDefaultPayMethod)
    : []
}

const getPaymentMethods = (payments) => {
  if (!payments) return []
  const paymentsMethods = payments
    .filter((p) => p?.billingInfo?.card)
    .map((c) => {
      return {
        cardType: c.paymentOrCardType,
        cardNumber: c.cardNumberPartOrMask,
        expiry: c.expireMonth + " / " + c.expireYear,
        cvv: c.ccLastFour,
      }
    })

  return paymentsMethods
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
  getPaymentMethods,
  getCardType,
  getExpireDate,
  getSortedPaymentMethods,
  getCardEndingDigits,
  getCardType,
}
