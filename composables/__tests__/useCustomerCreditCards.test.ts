import { updatePaymentCard, deletePaymentCard, addPaymentCard } from "@/lib/gql/mutations"
import { getPaymentCards } from "@/lib/gql/queries/checkout/getPaymentCards"
import { useCustomerCreditCards } from "@/composables/useCustomerCreditCards"

const mockGetPaymentCardsQuery = getPaymentCards
const mockUpdatePaymentCardMutation = updatePaymentCard
const mockDeletePaymentCardMutation = deletePaymentCard
const mockAddPaymentCardMutation = addPaymentCard

// Response
const getPaymentCardsQueryResponse = {
  items: [
    {
      nameOnCard: "Test User",
      cardType: "VISA",
      cardNumberPart: "************1111",
      expireMonth: 8,
      expireYear: 2022,
    },
  ],
}
const updatePaymentCardResponse = {}
const deletePaymentCardResponse = {}
const addPaymentCardResponse = {}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockGetPaymentCardsQuery) {
          return {
            data: {
              customerAccountCards: getPaymentCardsQueryResponse,
            },
          }
        } else if (params.query === mockUpdatePaymentCardMutation) {
          return { data: updatePaymentCardResponse }
        } else if (params.query === mockDeletePaymentCardMutation) {
          return { data: deletePaymentCardResponse }
        } else if (params.query === mockAddPaymentCardMutation) {
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

describe("[composable] useCustomerCreditCards", () => {
  const { cards, load, updateCard, tokenizeCard, addPaymentMethodByTokenizeCard, loading, error } =
    useCustomerCreditCards()

  test("useCustomerCreditCards : should get checkout ", async () => {
    const accountId = 1383

    await load(accountId)
    expect(cards.value).toStrictEqual(getPaymentCardsQueryResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCustomerCreditCards : should update card info ", async () => {
    const updatedCartInput = {
      id: "12f9642217a5a300010448ca000045a4",
      nameOnCard: "Test User",
      cardType: "VISA",
      cardNumberPart: "************1111",
      expireMonth: 8,
      expireYear: 2022,
      contactId: 2,
    }

    const accountId = 1233
    const cardId = "12f9642217a5a300010448ca000045a4"

    await updateCard(accountId, cardId, updatedCartInput)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCustomerCreditCards : should add payment method info ", async () => {
    const paymentAction = {
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

    const orderId = "12f9642217a5a300010448ca000045a4"

    await addPaymentMethodByTokenizeCard(orderId, paymentAction)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCustomerCreditCards : should be able to tokenize the card ", async () => {
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
