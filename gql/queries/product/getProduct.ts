/* eslint-disable import/no-named-as-default */
import { productInfo } from "../../fragments"

export const getProductQuery = `
  ${productInfo}

  query product($productCode: String!) {
    product(productCode: $productCode) {
      ...productInfo
    }
  }
`
