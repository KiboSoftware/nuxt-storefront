export const configureProductMutation = /* GraphQL */ `
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
        msrp
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
          shopperEnteredValue
        }
        isProductImageGroupSelector
      }
    }
  }
`
