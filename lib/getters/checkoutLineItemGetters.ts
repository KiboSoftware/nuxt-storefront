import { CrOrderItem } from "@/server/types/GraphQL"

const getId = (checkoutItem: CrOrderItem) => checkoutItem?.id
const getTotal = (checkoutItem: CrOrderItem) => checkoutItem?.total
const getSubtotal = (checkoutItem: CrOrderItem) => checkoutItem?.total
const getExpectedDeliveryDate = (checkoutItem: CrOrderItem) => checkoutItem?.expectedDeliveryDate
const getFulfillmentLocationCode = (checkoutItem: CrOrderItem) =>
  checkoutItem?.fulfillmentLocationCode
const getItemDiscount = (checkoutItem: CrOrderItem) => checkoutItem?.productDiscount
const getProductName = (checkoutItem: CrOrderItem) => checkoutItem?.product?.name
const getProductImage = (checkoutItem: CrOrderItem) => checkoutItem?.product?.imageUrl
const getProductPrice = (checkoutItem: CrOrderItem) => checkoutItem?.product?.price?.price
const getProductOptions = (checkoutItem: CrOrderItem) => checkoutItem?.product?.options

export const checkoutLineItemGetters = {
  getId,
  getTotal,
  getSubtotal,
  getExpectedDeliveryDate,
  getFulfillmentLocationCode,
  getItemDiscount,
  getProductName,
  getProductImage,
  getProductPrice,
  getProductOptions,
}
