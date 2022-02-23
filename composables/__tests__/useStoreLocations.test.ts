import { useStoreLocations } from "./../storeFinder/useStoreLocations"

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
  const { locations, search, loading, error } = useStoreLocations("mock")

  test("search: should search stores by coordinates", async () => {
    const coords = {
      latitude: "10.5123",
      longitude: "30.1234",
    }

    const filter = {
      filter: `geo near(${coords.latitude},${coords.longitude},160934)`,
    }
    await search(filter)
    expect(locations.value).toStrictEqual([
      { code: "store_location1" },
      { code: "store_location2" },
    ])
  })

  test("search: should search stores by zipcode", async () => {
    const zipCode = "12345"
    const filter = { filter: `geo near(${zipCode},160934)` }
    await search(filter)
    expect(locations.value).toStrictEqual([
      { code: "store_location1" },
      { code: "store_location2" },
    ])
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeNull()
  })
})
