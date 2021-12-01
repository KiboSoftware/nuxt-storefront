import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useStoreLocations } from "./../storeFinder/useStoreLocations"

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
            items: [{ code: "store_location1" }, { code: "store_location2" }],
          },
        },
      }),
    },
  }),
}))

describe("[composable] useStoreLocations", () => {
  const { locations, search } = useStoreLocations()

  test("search: should search stores by coordinates", async () => {
    const coords = {
      latitude: "10.5123",
      longitude: "30.1234",
    }
    await search(coords)
    expect(locations.value).toStrictEqual([
      { code: "store_location1" },
      { code: "store_location2" },
    ])
  })

  test("search: should search stores by zipcode", async () => {
    const zipCode = "12345"

    await search(zipCode)
    expect(locations.value).toStrictEqual([
      { code: "store_location1" },
      { code: "store_location2" },
    ])
  })
})
