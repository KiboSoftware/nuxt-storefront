import { CrProductInput, Wishlist, WishlistItem } from "~~/server/types/GraphQL"

const getItems = (wishlist: Wishlist) => wishlist?.items.map((item) => item.product)

const getItemName = (product: CrProductInput): string => product?.name

const getItemImage = (product: CrProductInput): string => product?.imageUrl

const getItemPrice = (product: CrProductInput) => {
  const { price, salePrice } = product.price
  return {
    regular: price as number,
    special: salePrice as number,
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemAttributes = (product: CrProductInput, filterByAttributeName?: string[]) => {
  const attributes = {}
  const options = filterByAttributeName
    ? product?.options?.filter((o) => filterByAttributeName.includes(o.name.toLowerCase()))
    : product?.options || []
  options.forEach((opt) => {
    attributes[opt.name] = opt.value
  })

  return attributes
}

const getItemSku = (product: CrProductInput): string =>
  product?.sku || product?.variationProductCode || product?.productCode

const getTotals = (wishlist: Wishlist) => {
  const items = wishlist?.items
  return {
    total: items.reduce((acc, { total }) => acc + total, 0),
    subtotal: items.reduce((acc, { subtotal }) => acc + subtotal, 0),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getShippingPrice = (wishlist: Wishlist): number => {
  return 0
}

const getTotalItems = (wishlist: Wishlist): number => wishlist?.items?.length

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFormattedPrice = (price: number): string => {
  return ""
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemQty = (item: WishlistItem): number => {
  return 1
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shouldShowAddToWishlist = (isInWishlist: boolean) => {
  if (isInWishlist) {
    return false
  }
  return true
}

export const wishlistGetters = {
  getItems,
  getTotals,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getShippingPrice,
  getItemSku,
  getTotalItems,
  getFormattedPrice,
  shouldShowAddToWishlist,
}
