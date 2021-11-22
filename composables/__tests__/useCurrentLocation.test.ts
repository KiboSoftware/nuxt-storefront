import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useCurrentLocation } from "../storeFinder/useCurrentLocation"
import * as getCurrentUserPosition from "../storeFinder/utils/getUserCurrentPosition"

Vue.use(VueCompositionApi)
jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return init
  }),
}))

describe("[composable] useCurrentLocation", () => {
  const { currentLocation, loadWithNavigator } = useCurrentLocation()

  jest.spyOn(getCurrentUserPosition, "getCurrentUserPosition").mockReturnValue(
    Promise.resolve({
      coords: {
        latitude: "30.242292",
        longitude: "-97.783232",
      },
    })
  )

  test("loadWithNavigator: should return current location (longitude and latitude)", async () => {
    process.browser = true
    await loadWithNavigator()
    expect(currentLocation.value).toStrictEqual({
      latitude: "30.242292",
      longitude: "-97.783232",
    })
  })
})
