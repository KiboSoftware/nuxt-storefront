import { Ref, ComputedRef } from "@vue/composition-api"
import { CustomQuery } from "@/composables/types/common"
import * as GraphQL from "@/server/types/GraphQL"

// getProduct
export type GetProductParams = { id: string; customQuery?: CustomQuery }
export type GetProductResponse = Promise<GraphQL.Product>

// configureProduct
export type ConfigureProductParams = {
  customQuery?: CustomQuery
  id: string
  attributes: {
    [x: string]: string
  }
}

export type ConfigureProductResponse = Promise<GraphQL.Product>

// searchSuggestions
export type SearchSuggestionsParams = {
  perPage?: number
  page?: number
  sort?: string | {}
  term?: string
  filters?: string | {}
  customQuery?: CustomQuery
  [x: string]: string | number | {} | undefined
}

export type SearchSuggestionsResponse = Promise<GraphQL.ProductSearchResult>

// Search
export type SearchParams = ConfigureProductParams | GetProductParams | SearchSuggestionsParams

// useProduct
export type useProductResponse = {
  search: (params: SearchParams) => Promise<void>
  result: ComputedRef<GraphQL.Product>
  loading: Ref<boolean>
  error: Ref<string | {}>
}
