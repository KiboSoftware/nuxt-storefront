/* eslint-disable import/no-named-as-default */
import gql from "graphql-tag"
import { productInfo } from "../../fragments"

export const getProductQuery = gql`
  ${productInfo}

  query product($productCode: String!) {
    product(productCode: $productCode) {
      ...productInfo
    }
  }
`
