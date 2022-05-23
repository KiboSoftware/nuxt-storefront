export const wishlistItem = `
fragment wishlistItem on WishlistItem {
    id
    quantity
    total
    subtotal
    product {
      productCode
      name
      description
      imageUrl
      variationProductCode
      options {
        attributeFQN
        name
        value
      }
      price {
        price
        salePrice
      }
    }
}

`

export const wishList = /* GraphQL */ `
  fragment wishList on Wishlist {
    customerAccountId
    name
    id
    items {
      ...wishlistItem
    }
  }

  ${wishlistItem}
`
