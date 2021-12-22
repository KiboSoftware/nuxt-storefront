import type { Ref } from "@vue/composition-api"
import type { ApolloQueryResult } from "apollo-client"
import * as GraphQL from "@/server/types/GraphQL"

// QueryResponse
export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>

export interface getFacetsFromURLResponse {
  categoryCode: string
  page: number
  itemsPerPage: number
  phrase: string
  filters: Array<string>
  sort: string
}
export interface uiHelpersReturnType {
  getCatLink?: (category: GraphQL.PrCategory) => string
  getFacetsFromURL: (isSearchPage: boolean) => getFacetsFromURLResponse
  setTermForUrl: (query: string) => void
  getProductLink: (productCode: string) => string
  changeFilters: (filters) => void
  changeSorting: (sort: string) => void
  setCategoryLink: (isSearchPage: boolean, category: GraphQL.PrCategory) => void
}

// categories
export type CategoriesResponse = QueryResponse<"items", GraphQL.PrCategory>

// useCategoryTree
export type UseCategoryTreeResponse = {
  load: () => Promise<void>
  categories: Ref<GraphQL.PrCategory[]>
  loading: Ref<boolean>
  error: Ref<string | {}>
}
