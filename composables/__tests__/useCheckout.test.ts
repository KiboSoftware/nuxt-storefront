import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"

import {
  getOrCreateCheckoutFromCartMutation,
  setShippingInfoMutation,
  setBillingInfoMutation,
  updateOrder,
} from "@/lib/gql/mutations"
import { getCheckoutQuery } from "@/lib/gql/queries"

import { useCheckout } from "@/composables/useCheckout"
Vue.use(VueCompositionApi)

const mockGetOrCreateCheckoutFromCartMutation = getOrCreateCheckoutFromCartMutation
const mockGetCheckoutQuery = getCheckoutQuery
const mockSetShippingInfoMutation = setShippingInfoMutation
const mockSetBillingInfoMutation = setBillingInfoMutation
const mockUpdateOrder = updateOrder

// Response
const getOrCreateCheckoutFromCartResponse = {
  checkout: {
    id: "12f9642217a5a300010448ca000045a4",
    email: null,
    total: 250,
    shippingTotal: 0,
    discountTotal: 0,
    subtotal: 250,
    taxTotal: 0,
    orderNumber: 24,
    orderDiscounts: [],
    items: [],
  },
}
const getCheckoutQueryResponse = {
  checkout: {
    id: "12f9642217a5a300010448ca000045a4",
    email: null,
    total: 250,
    shippingTotal: 0,
    discountTotal: 0,
    subtotal: 250,
    taxTotal: 0,
    orderNumber: 24,
    orderDiscounts: [],
    items: [],
  },
}
const setShippingInfoResponse = {}
const setBillingInfoResponse = {}
const updateOrderResponse = {}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockGetOrCreateCheckoutFromCartMutation) {
          return { data: getOrCreateCheckoutFromCartResponse }
        } else if (params.query === mockGetCheckoutQuery) {
          return { data: getCheckoutQueryResponse }
        } else if (params.query === mockSetShippingInfoMutation) {
          return { data: setShippingInfoResponse }
        } else if (params.query === mockSetBillingInfoMutation) {
          return { data: setBillingInfoResponse }
        } else if (params.query === mockUpdateOrder) {
          return { data: updateOrderResponse }
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

describe("[composable] useUser", () => {
  const {
    load,
    loadFromCart,
    checkout,
    setPersonalInfo,
    setShippingInfo,
    setBillingInfo,
    loading,
    error,
  } = useCheckout()

  test("useCheckout : should get or create checkout ", async () => {
    const cartId = "12f9641217a5a300010448c9000045a4"

    await loadFromCart(cartId)
    expect(checkout.value).toEqual(getOrCreateCheckoutFromCartResponse.checkout)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCheckout : should get checkout ", async () => {
    const checkoutId = "12f9642217a5a300010448ca000045a4"

    await load(checkoutId)
    expect(checkout.value).toEqual(getCheckoutQueryResponse.checkout)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCheckout : should save personal info ", async () => {
    const updatedCheckoutInput = {
      id: "12f9642217a5a300010448ca000045a4",
      email: "firstName@gamil.com",
      totalCollected: 0,
      amountAvailableForRefund: 0,
      amountRemainingForPayment: 0,
      amountRefunded: 0,
    }

    const variables = {
      orderId: "12f9642217a5a300010448ca000045a4",
      updateMode: "ApplyToOriginal",
      orderInput: updatedCheckoutInput,
    }

    await setPersonalInfo(variables)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCheckout : should save shipping info ", async () => {
    await setShippingInfo({})
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })

  test("useCheckout : should save billing info ", async () => {
    await setBillingInfo({})
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
