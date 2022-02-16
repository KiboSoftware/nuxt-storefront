import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"

import { getShippingRatesQuery } from "@/lib/gql/queries"
import { useShippingMethods } from "@/composables/useShippingMethods"

Vue.use(VueCompositionApi)

const mockGetShippingRatesQuery = getShippingRatesQuery

// Response
const shippingRatesResponse = {
  orderShipmentMethods: [
    {
      shippingMethodCode: "691f94b2b57e47239456ada600cdcc9e",
      shippingMethodName: "Flat Rate",
      shippingZoneCode: "Americas",
      isValid: true,
      messages: [],
      data: null,
      currencyCode: "USD",
      price: 15,
    },
  ],
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockGetShippingRatesQuery) {
          return { data: shippingRatesResponse }
        }
      }),
    },
  }),
}))

describe("[composable] useShippingMethods", () => {
  const { load, shippingMethods, loading, error } = useShippingMethods()

  test("useCheckout : should return shipping methods ", async () => {
    const checkoutId = "130a530903c65b00012bf492000045a4"

    await load(checkoutId)
    expect(shippingMethods.value).toEqual(shippingRatesResponse.orderShipmentMethods)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
