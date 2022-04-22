/* eslint-disable import/no-named-as-default */
import { productInfo } from "@/lib/gql/fragments"

export const getProductQuery = /* GraphQL */`
  ${productInfo}

  query product($productCode: String!) {
    product(productCode: $productCode) {
      ...productInfo
    }
  }
`
