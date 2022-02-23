import type { BillingInfo, PaymentActionInput } from "@/server/types/GraphQL"
import { creditCardPaymentGetters, checkoutGetters } from "@/lib/getters"

export const buildPaymentMethodInput = (
  currencyCode,
  checkout,
  creditCardData,
  tokenizedData,
  billingAddress,
  isBillingAddressAsShipping
): PaymentActionInput => {
  const ccPaymentServiceCardId = creditCardPaymentGetters.getId(tokenizedData)
  const ccNumberPart = creditCardPaymentGetters.getCardNumberMask(tokenizedData)

  const billingInfo: BillingInfo = {
    paymentType: creditCardPaymentGetters.getPaymentType(creditCardData.paymentType),
    billingContact: billingAddress,
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
    amount: checkoutGetters.getTotal(checkout?.value),
    newBillingInfo: {
      ...billingInfo,
      paymentWorkflow: creditCardData.card.paymentWorkflow,
      isSameBillingShippingAddress: isBillingAddressAsShipping,
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
      isCardDetailsFilled: false,
    },
  }
}
