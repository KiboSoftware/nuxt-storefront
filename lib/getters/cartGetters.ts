import { Cart, CartItem, Maybe, CrProductOption } from "@/server/types/GraphQL"
import { useNuxtApp } from "#app"

export const getCartItems = (cart: Cart): Maybe<CartItem>[] => cart?.items || []

export const getCartItemName = (item: CartItem) => item?.product?.name

export const getCartItemImage = (item: CartItem) => item?.product?.imageUrl

export const getCartItemPrice = (
  item: CartItem
): { regular: Maybe<Number> | undefined | null; special: Maybe<Number> | undefined | null } => {
  return {
    regular: item.product?.price?.price,
    special: item.product?.price?.salePrice,
  }
}

export const getCartItemQty = (item: CartItem): number => item?.quantity

export const getCartItemAttributes = (
  item: CartItem,
  filterByAttributeName: string
): Record<string, string> => {
  const attributes: Record<string, string> = {}
  if (Array.isArray(filterByAttributeName) && filterByAttributeName.length) {
    filterByAttributeName.forEach((attr: string) => {
      attributes[attr] = "N/A"
      item?.product?.options?.filter((o) => {
        if (
          filterByAttributeName.includes(o?.name?.toLowerCase()) &&
          attr === o?.name?.toLowerCase()
        ) {
          attributes[attr] = o.value
          return true
        }
        return false
      })
    })
  } else {
    const options = item.product?.options || []
    options?.forEach((opt: Maybe<CrProductOption>) => {
      if (opt?.name) attributes[opt.name] = opt?.value
    })
  }

  return attributes
}

export const getCartItemSku = (item: CartItem) =>
  item?.product?.sku || item?.product?.upc || item?.product?.productCode

function getTotals(cart: Cart) {
  return {
    total: cart?.total,
    subtotal: cart?.subtotal,
    discountedSubtotal: cart?.discountedSubtotal,
    discountedTotal: cart?.discountedTotal,
  }
}

export const getCartShippingPrice = (cart: Cart) => cart?.shippingTotal

export const getCartTotalItems = (cart: Cart): number => cart?.items?.length || 0

export const getCartTotalQuantity = (cart: Cart): number => {
  return cart?.items?.reduce((acc, { quantity }) => acc + quantity, 0)
}

export const getFormattedPrice = (price: number): string => String(price)

export const getCoupons = (cart: Cart) =>
  cart?.orderDiscounts
    ?.filter((d) => d?.couponCode !== null)
    .map((d) => ({
      id: d?.discount?.id.toString(),
      name: d?.discount?.name,
      code: d?.couponCode,
      value: d?.impact,
    }))

export const getDiscounts = (cart: Cart) => {
  return cart?.orderDiscounts?.map((d) => ({
    id: d?.discount?.id.toString(),
    name: d?.discount?.name,
    description: d?.discount?.name,
    value: d?.impact,
    code: d?.couponCode,
  }))
}

const isDisabledFulfillmentOption = (fulfillmentTypesSupported, option) => {
  return !fulfillmentTypesSupported?.includes(option)
}

export const getCartFulfillmentOptions = (item: CartItem, cartItemFulfillmentLocation: string) => {
  const nuxt = useNuxtApp()
  const fullfillmentOptions = nuxt.nuxt2Context.$config.fullfillmentOptions

  const result = fullfillmentOptions.map((option) => ({
    value: option.value,
    name: option.name,
    code: option.code,
    label: option.label,
    details: option.details,
    required: option.isRequired,
    shortName: option.shortName,
    disabled: isDisabledFulfillmentOption(item.product?.fulfillmentTypesSupported, option.value),
    fulfillmentMethod: item?.fulfillmentMethod,
    fulfillmentLocation: cartItemFulfillmentLocation,
    fulfillmentTypesSupported: item?.product?.fulfillmentTypesSupported,
  }))

  return result
}

export const getCartItem = (cart: Cart, cartItemId: string): Maybe<CartItem> =>
  cart?.items?.find((item) => item.id === cartItemId)

export const getCartItemOptions = (item: CartItem) => item?.product?.options

const getProductAppliedCoupons = (cartItem) => {
  return cartItem?.productDiscounts?.map((each) => each.couponCode)
}

const getSelectedFullfillmentOption = (item: CartItem) => {
  return item?.fulfillmentMethod
}

const getFulfillmentLocation = (item: CartItem, locations): string => {
  return locations.find((location) => location.code === item?.fulfillmentLocationCode)?.name
}

export const cartGetters = {
  getTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getItemOptions: getCartItemOptions,
  getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts,
  getCartFulfillmentOptions,
  getCartItem,
  getCartTotalQuantity,
  getSelectedFullfillmentOption,
  getFulfillmentLocation,
  getProductAppliedCoupons,
}
