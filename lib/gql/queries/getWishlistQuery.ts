import { wishList } from "../fragments"

export const getWishlistQuery = /* GraphQL */ `
  query {
    wishlists {
      items {
        ...wishList
      }
    }
  }
  ${wishList}
`
