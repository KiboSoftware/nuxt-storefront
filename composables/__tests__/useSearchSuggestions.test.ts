import { useSearchSuggestions } from "./../useSearchSuggestions"

const searchResponse = {
  suggestionSearch: "Mocked suggestion search result",
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: searchResponse,
      }),
    },
  }),
}))

describe("[composable] useSearchSuggestions", () => {
  const { result, search, loading, error } = useSearchSuggestions()
  test("search: should search products search suggestion and save as result", async () => {
    const params = "jacket"
    await search(params as string)
    expect(result.value).toStrictEqual(searchResponse.suggestionSearch)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
