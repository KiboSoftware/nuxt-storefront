import { getSearchSuggestions } from "@/gql/queries"
import { useState, useNuxtApp } from "#app"
import type { SearchSuggestionResult, Maybe} from "@/server/types/GraphQL"

export const useSearchSuggestions = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const result = useState<Maybe<SearchSuggestionResult>>(`search-suggestions-result`, () => ({}))
  const loading = useState<Boolean>(`search-suggestions-loading`, () => false)
  const error = useState(`search-suggestions-error`, () => null)

  const search = async (query: string) => {
    try {
      if (query && query.length > 0) {
        loading.value = true
        const response = await fetcher({
          query: getSearchSuggestions,
          variables: { query },
        })
        result.value = response?.data?.suggestionSearch
      }
    } catch (err) {
      console.log("error : ", error)
    } finally {
      loading.value = false
    }
  }

  return {
    result,
    search,
    loading,
    error,
  }
}
