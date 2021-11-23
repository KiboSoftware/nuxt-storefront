import { getSearchSuggestions } from "~~/gql/queries"
import { useState, useNuxtApp } from "#app"
import * as GraphQLTypes from "@/server/types/GraphQL"

export const useSearchSuggestions = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const result = useState(`use-result-search`, (): GraphQLTypes.SearchSuggestionResult => {
    return {} as GraphQLTypes.SearchSuggestionResult
  })
  const loading = useState(`use-result-loading-search`, () => false)
  const error = useState(`use-result-error-search`, () => null)

  const search = async (query: string) => {
    try {
      if (query && query.length > 0) {
        loading.value = true
        const response = await fetcher({
          query: getSearchSuggestions,
          variables: { query },
        })
        result.value = response.data.suggestionSearch
      }
    } catch (err) {}
    loading.value = false
  }

  return {
    result,
    search,
    loading,
    error,
  }
}
