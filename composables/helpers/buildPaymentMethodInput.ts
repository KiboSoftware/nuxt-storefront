import type { BillingInfo, PaymentActionInput } from "@/server/types/GraphQL"
import { creditCardPaymentGetters } from "@/lib/getters/creditCardPaymentGetters"

export const buildPaymentMethodInput = (
  paymentType,
  currencyCode,
  paymentWorkflow,
  checkout,
  creditCardData,
  tokenizedData
): PaymentActionInput => {
  const ccPaymentServiceCardId = creditCardPaymentGetters.getId(tokenizedData)
  const ccNumberPart = creditCardPaymentGetters.getCardNumberMask(tokenizedData)

  const paymentActionObjectParams: BillingInfo = {
    paymentType,
    card: {
      paymentServiceCardId: ccPaymentServiceCardId,
      isUsedRecurring: false,
      // nameOnCard: creditCardData.cardholderName,
      isCardInfoSaved: false,
      isTokenized: true,
      paymentOrCardType: creditCardData.cardType,
      cardNumberPartOrMask: ccNumberPart,
      expireMonth: creditCardData.expireMonth,
      expireYear: creditCardData.expireYear,
    },
  }

  return {
    currencyCode,
    amount: creditCardPaymentGetters.getAppliedTotal(checkout?.value),
    newBillingInfo: {
      ...paymentActionObjectParams,
      paymentWorkflow,
      isSameBillingShippingAddress: false,
    },
  }
}
