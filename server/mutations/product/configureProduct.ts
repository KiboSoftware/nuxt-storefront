/* eslint-disable import/no-named-as-default */
import gql from "graphql-tag"

export const configureProductMutation = gql`
  mutation configureProduct(
    $productCode: String!
    $selectedOptions: ProductOptionSelectionsInput!
  ) {
    configureProduct(
      productCode: $productCode
      includeOptionDetails: true
      productOptionSelectionsInput: $selectedOptions
    ) {
      productCode
      variationProductCode
      purchasableState {
        isPurchasable
      }
      price {
        salePrice
        price
      }
      productImages {
        imageUrl
        imageLabel
        productImageGroupId
      }
      options {
        attributeFQN
        values {
          value
          attributeValueId
          isEnabled
          isSelected
        }
        isProductImageGroupSelector
      }
    }
  }
`
