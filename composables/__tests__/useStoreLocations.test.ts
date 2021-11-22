import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useStoreLocations } from "./../storeFinder/useStoreLocations"

Vue.use(VueCompositionApi)

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return init
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

  test("search: should search stores", async () => {
    await search()
    expect(locations.value).toStrictEqual([
      { code: "store_location1" },
      { code: "store_location2" },
    ])
  })
})
