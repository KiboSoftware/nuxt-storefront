export const cartItemDetails = /* GraphQL */`
fragment cartItemDetails on CartItem {
  id
  fulfillmentMethod
  purchaseLocation
  fulfillmentLocationCode
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

export const cartDetails = /* GraphQL */`
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
