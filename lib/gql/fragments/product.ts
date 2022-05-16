export const productPrices = /* GraphQL */ `
  fragment productPrices on Product {
    price {
      price
      salePrice
      msrp
    }
    priceRange {
      lower {
        price
        salePrice
        msrp
      }
      upper {
        price
        salePrice
        msrp
      }
    }
  }
`
export const productAttributes = /* GraphQL */ `
  fragment productAttributes on Product {
    properties {
      attributeFQN
      attributeDetail {
        name
      }
      isHidden
      values {
        value
        stringValue
      }
    }
  }
`
export const productContent = /* GraphQL */ `
  fragment productContent on Product {
    content {
      productFullDescription
      productShortDescription
      seoFriendlyUrl
      productName
      productImages {
        imageUrl
        imageLabel
        mediaType
        productImageGroupId
      }
    }
  }
`
export const productOptions = /* GraphQL */ `
  fragment productOptions on Product {
    options {
      attributeFQN
      attributeDetail {
        name
        inputType
      }
      isProductImageGroupSelector
      isRequired
      isMultiValue
      values {
        value
        isSelected
        deltaPrice
        stringValue
      }
    }
  }
`
export const productImageGroup = /* GraphQL */ `
  fragment productImageGroup on Product {
    productImageGroups {
      productImageGroupId
      productImageGroupTags {
        attributeFqn
        value
      }
    }
  }
`
export const productInventoryInfo = /* GraphQL */ `
  fragment productInventoryInfo on Product {
    inventoryInfo {
      manageStock
      onlineLocationCode
      onlineSoftStockAvailable
      onlineStockAvailable
    }
  }
`
export const productInfo = /* GraphQL */ `
  fragment productInfo on Product {
    fulfillmentTypesSupported
    productCode
    productUsage
    isPackagedStandAlone
    categories {
      categoryCode
      categoryId
      isDisplayed
      parentCategory {
        categoryId
        categoryCode
        categoryId
        isDisplayed
        content {
          name
          slug
        }
      }
      content {
        name
        slug
      }
    }
    purchasableState {
      isPurchasable
    }
    ...productPrices
    ...productAttributes
    ...productContent
    ...productOptions
    ...productImageGroup
    ...productInventoryInfo
  }
  ${productPrices}
  ${productAttributes}
  ${productContent}
  ${productOptions}
  ${productImageGroup}
  ${productInventoryInfo}
`
