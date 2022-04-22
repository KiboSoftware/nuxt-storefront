import { wishList } from "../../fragments"

export const createWishlistMutation = /* GraphQL */ `
  mutation createWishlist($wishlistInput: WishlistInput!) {
    createWishlist(wishlistInput: $wishlistInput) {
      ...wishList
    }
  }
  ${wishList}
`
