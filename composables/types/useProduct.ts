import { ApolloQueryResult } from "apollo-client"
import { FetchResult } from "apollo-link"
import { Ref } from "@vue/composition-api"
import * as GraphQL from "@/server/types/GraphQL"

export declare type CustomQuery = Record<string, string>

// QueryResponse and MutationResponse
export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>

// useProduct
export type GetProductParams = { id: string; customQuery?: CustomQuery }
export type GetProductResponse = QueryResponse<"product", GraphQL.Product>

export type SearchProductParams = {
  perPage?: number
  page?: number
  sort?: string | {}
  term?: string
  filters?: string | {}
  customQuery?: CustomQuery
  [x: string]: string | number | {} | undefined
}
export type SearchProductResponse = QueryResponse<"products", GraphQL.ProductSearchResult>

export type ConfigureProductParams = {
  customQuery?: CustomQuery
  id: string
  attributes: {
    [x: string]: string
  }
}

export type ConfigureProductResponse = QueryResponse<"configureProduct", GraphQL.ConfiguredProduct>

export type GetRelatedProductsParams = {
  id: string
  limit: number
  catId: string[]
  customQuery?: CustomQuery
}

export type GetRelatedProductsResponse = QueryResponse<"products", GraphQL.ProductCollection>

export type SearchParams = ConfigureProductParams | GetProductParams | SearchProductParams

export type useProductResponse = {
  search:
    | ((params: SearchProductParams) => Promise<void>)
    | ((params: GetRelatedProductsParams) => Promise<void>)
  result: Ref<{}>
  loading: Ref<boolean>
  error: Ref<string | {}>
}
