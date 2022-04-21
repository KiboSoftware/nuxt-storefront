import { wishlistItem } from "../../fragments"

export const createWishlistItemMutation = /* GraphQL */ `
  mutation createWishlistItem($wishlistId: String!, $wishlistItemInput: WishlistItemInput) {
    createWishlistItem(wishlistId: $wishlistId, wishlistItemInput: $wishlistItemInput) {
      ...wishlistItem
    }
  }
  ${wishlistItem}
`
