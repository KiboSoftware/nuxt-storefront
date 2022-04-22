import { addPaymentMethod } from "@/lib/gql/mutations"
import { usePaymentMethods } from "@/composables"

const mockAddPaymentMethodMutation = addPaymentMethod
const addPaymentCardResponse = {}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockAddPaymentMethodMutation) {
          return { data: addPaymentCardResponse }
        }
      }),
      app: {
        $cookies: {
          get: jest.fn().mockReturnValue("kibo_at"),
        },
      },
      $config: {
        storeLocationCookie: "kibo_at",
      },
    },
  }),
}))

describe("[composable] usePaymentMethods", () => {
  const { tokenizeCard, addPaymentMethodByTokenizeCard, loading, error } = usePaymentMethods()

  test("usePaymentMethods : should add payment method info ", async () => {
    const billingInfo = {
      paymentType: "CreditCard",
      card: {
        paymentServiceCardId: "12f9642217a5a300010448ca000045a4",
        isUsedRecurring: false,
        isCardInfoSaved: false,
        isTokenized: true,
        paymentOrCardType: "Visa",
        cardNumberPartOrMask: "***********1111",
        expireMonth: 8,
        expireYear: 22,
      },
    }

    const paymentAction = {
      currencyCode: "USD",
      amount: 8,
      newBillingInfo: {
        ...billingInfo,
        paymentWorkflow: "",
        isSameBillingShippingAddress: false,
      },
    }

    const orderId = "12f9642217a5a300010448ca000045a4"

    await addPaymentMethodByTokenizeCard(orderId, paymentAction)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("usePaymentMethods : should be able to tokenize the card ", async () => {
    const paymentAction = {
      cardNumber: "41111111111111111",
      cardType: "VISA",
      cvv: 123,
      expireMonth: 8,
      expireYear: 22,
    }

    await tokenizeCard(paymentAction)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
