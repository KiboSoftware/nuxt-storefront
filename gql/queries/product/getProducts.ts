/* eslint-disable import/no-named-as-default */
import gql from "graphql-tag"
import { productInfo } from "@/gql/fragments"

export const getProductsQuery = gql`
  ${productInfo}

  query products($filter: String, $pageSize: Int) {
    products(filter: $filter, pageSize: $pageSize) {
      items {
        ...productInfo
      }
    }
  }
`
