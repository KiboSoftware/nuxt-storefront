export const cartItemDetails = `
fragment cartItemDetails on CartItem {
  id
  productDiscounts{
    discountQuantity
  }
  subtotal
  total
  product {
    productCode
    fulfillmentTypesSupported
    name
    description
    imageUrl
    options {
      attributeFQN
      name
      value
    }
    properties {
      attributeFQN
      name
      values {
        value
      }
    }
    sku
    price {
      price
      salePrice
    }
    categories {
      id
    }
  }
  quantity
}
`

export const cartDetails = `
${cartItemDetails}

fragment cartDetails on Cart {
  id
  orderDiscounts {
    impact
    discount {
      id
      name        
    }
    couponCode
  }
  subtotal
  discountedSubtotal
  shippingTotal
  total
  items {
    ...cartItemDetails
  }
}
`
