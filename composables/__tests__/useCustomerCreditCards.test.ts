import { updateCustomerAccountCard, deleteCustomerAccountCard } from "@/lib/gql/mutations"
import { getCustomerAccountCards } from "@/lib/gql/queries"
import { useCustomerCreditCards } from "@/composables"

const mockGetPaymentCardsQuery = getCustomerAccountCards
const mockUpdatePaymentCardMutation = updateCustomerAccountCard
const mockDeletePaymentCardMutation = deleteCustomerAccountCard

jest.mock("@/lib/operations/get-page", () => {
  return {
    getPage: () => {
      return Promise.resolve({ components: [] })
    },
  }
})

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
  const { cards, load, updateCard, loading, error } = useCustomerCreditCards()

  test("useCustomerCreditCards : should get checkout ", async () => {
    const accountId = 1383

    await load(accountId)
    expect(cards.value).toStrictEqual(getPaymentCardsQueryResponse.items)
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
})
