import { ApolloQueryResult } from "apollo-client"
import { FetchResult } from "apollo-link"

export declare type CustomQuery = Record<string, string>

// QueryResponse and MutationResponse
export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>
