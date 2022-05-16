/* eslint-disable import/no-named-as-default */
import { productInfo } from "../fragments"

export const getProductQuery = /* GraphQL */ `
  ${productInfo}

  query product($productCode: String!) {
    product(productCode: $productCode) {
      ...productInfo
    }
  }
`

export const productLocationInventoryQuery = /* GraphQL */ `
  query productLocationInventory($productCode: String!, $locationCodes: String) {
    productLocationInventory(productCode: $productCode, locationCodes: $locationCodes) {
      items {
        locationCode
        stockAvailable
        softStockAvailable
      }
    }
  }
`
