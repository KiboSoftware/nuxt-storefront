export const productPrices = `
fragment productPrices on Product {
      price {
        price
        salePrice
      }
      priceRange {
        lower { price, salePrice}
        upper { price, salePrice }
      }
    }
`
export const productAttributes = `
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
export const productContent = `
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
export const productOptions = `
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
export const productImageGroup = `
fragment productImageGroup on Product {
  productImageGroups {
    productImageGroupId 
    productImageGroupTags{
      attributeFqn,
      value
    }
  }
}
`
export const productInfo = `
fragment productInfo on Product {
        fulfillmentTypesSupported
        productCode
        productUsage
        isPackagedStandAlone
        categories {
          categoryCode
          categoryId
          isDisplayed
          parentCategory{
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
}
${productPrices}
${productAttributes}
${productContent}
${productOptions}
${productImageGroup}
`
