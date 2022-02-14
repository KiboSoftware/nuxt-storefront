import type { BillingInfo, PaymentActionInput } from "@/server/types/GraphQL"
import { creditCardPaymentGetters } from "@/lib/getters/creditCardPaymentGetters"

export const buildPaymentMethodInput = (
  currencyCode,
  checkout,
  creditCardData,
  tokenizedData
): PaymentActionInput => {
  const ccPaymentServiceCardId = creditCardPaymentGetters.getId(tokenizedData)
  const ccNumberPart = creditCardPaymentGetters.getCardNumberMask(tokenizedData)

  const billingInfo: BillingInfo = {
    paymentType: creditCardPaymentGetters.getPaymentType(creditCardData.paymentType),
    // Need to add billingContact
    card: {
      paymentServiceCardId: ccPaymentServiceCardId,
      isUsedRecurring: false,
      isCardInfoSaved: creditCardData.card.isCardInfoSaved,
      isTokenized: true,
      paymentOrCardType: creditCardData.card.cardType,
      cardNumberPartOrMask: ccNumberPart,
      expireMonth: creditCardData.card.expireMonth,
      expireYear: creditCardData.card.expireYear,
    },
  }

  const paymentAction = {
    currencyCode,
    amount: creditCardPaymentGetters.getAppliedTotal(checkout?.value),
    newBillingInfo: {
      ...billingInfo,
      paymentWorkflow: creditCardData.card.paymentWorkflow,
      // Need to pass selected value
      isSameBillingShippingAddress: false,
    },
  }

  return paymentAction
}

export const defaultPaymentDetails = () => {
  return {
    paymentType: "",
    card: {
      cardType: "",
      cardNumber: "",
      cvv: "",
      expiryDate: "",
      expireMonth: 0,
      expireYear: 0,
      isCardInfoSaved: false,
      paymentWorkflow: "Mozu",
    },
  }
}
