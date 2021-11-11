/* eslint-disable import/named */
import type { IncomingMessage, ServerResponse } from "http"
import type { KiboApolloClient } from "@kibocommerce/graphql-client"
import { ApolloQueryResult } from "apollo-client"
import { FetchResult } from "apollo-link"
import * as GraphQL from "./GraphQL"

export interface KiboIncomingMessage extends IncomingMessage {
  _kiboClient: KiboApolloClient
  _userClaims: string
  searchParams?: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
}
export interface Response extends ServerResponse {}

export declare type CustomQuery = Record<string, string>

// QueryResponse and MutationResponse
export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>

// product
export interface ConfigureProductParams extends KiboIncomingMessage {
  options: Record<string, string>
  product: GraphQL.Product
}
export type ConfigureProductResponse = QueryResponse<"configureProduct", GraphQL.ConfiguredProduct>
export type GetProductResponse = QueryResponse<"product", GraphQL.Product>
export type SearchProductResponse = QueryResponse<"products", GraphQL.ProductSearchResult>
export type SearchRelatedProductsResponse = QueryResponse<"products", GraphQL.ProductCollection>

// CategoryCollection
export type CategoryTreeResponse = QueryResponse<
  "categoriesTree",
  GraphQL.CategoryCollection
>