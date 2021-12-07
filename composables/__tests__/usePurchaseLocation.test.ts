import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import * as cookieHelper from "../helpers/cookieHelper"
import { usePurchaseLocation } from "./../storeFinder/usePurchaseLocation"

Vue.use(VueCompositionApi)

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: {
          spLocations: {
            items: [{ code: "purchase_location_value" }],
          },
        },
      }),
      app: {
        $cookies: {
          get: jest.fn().mockReturnValue("kibo_purchase_location"),
        },
      },
      $config: {
        storeLocationCookie: "kibo_purchase_location",
      },
    },
  }),
}))

describe("[composable] usePurchaseLocation", () => {
  const { purchaseLocation, load, set, loading, error } = usePurchaseLocation()

  test("load: should load purchase location from cookies and fetch store details from server and save as purchaseLocation", async () => {
    await load()
    expect(purchaseLocation.value).toStrictEqual({ code: "purchase_location_value" })
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })

  test("set: should set cookie if locationCode parameter is not null", () => {
    const locationCode = "mock-location-code"
    const storeClientCookieSpy = jest.spyOn(cookieHelper, "storeClientCookie")
    set(locationCode)
    expect(storeClientCookieSpy).toHaveBeenCalled()
  })

  test("set: should remove cookie if locationCode parameter is null", () => {
    const locationCode = null
    const removeClientCookieSpy = jest.spyOn(cookieHelper, "removeClientCookie")
    set(locationCode)
    expect(removeClientCookieSpy).toHaveBeenCalled()
  })
})
