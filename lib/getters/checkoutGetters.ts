const getOrderNumber = (checkout) => checkout?.orderNumber
const getOrderedItemCount = (checkout) => checkout?.items.length
const getEmail = (checkout) => checkout?.email
const getId = (checkout) => checkout?.id
const getTotal = (checkout): number => checkout?.total
const getDiscountedTotal = (checkout) => checkout?.orderDiscounts || 0
const getShippingTotal = (checkout) => checkout?.shippingTotal || 0
const getTaxTotal = (checkout) => checkout?.taxTotal || 0
const getSubtotal = (checkout): number => checkout?.subtotal
const getLineItemTotal = (checkout) => {
  return checkout?.items
    ? checkout?.items?.reduce((previous, current) => {
        return previous + current?.quantity
      }, 0)
    : 0
}
const getLineItemTaxTotal = (checkout) => (checkout.taxTotal ? checkout.taxTotal : 0)
const getItemsByFulfillment = (checkout, fulfillmentMethod) => {
  return checkout?.items?.filter((lineItem) => lineItem.fulfillmentMethod === fulfillmentMethod)
}
const getPickupItems = (checkout) => {
  return getItemsByFulfillment(checkout, "Pickup")
}
const getShipItems = (checkout) => getItemsByFulfillment(checkout, "Ship")
const getDeliveryItems = (checkout) => getItemsByFulfillment(checkout, "Delivery")

const getShippingMethod = (checkout) => {
  return checkout?.items?.shippingTotal ? "$" + `${checkout?.items?.shippingTotal}` : "FREE"
}

export const checkoutGetters = {
  getOrderNumber,
  getEmail,
  getId,
  getTotal,
  getDiscountedTotal,
  getShippingTotal,
  getTaxTotal,
  getSubtotal,
  getLineItemTotal,
  getLineItemTaxTotal,
  getPickupItems,
  getShipItems,
  getDeliveryItems,
  getShippingMethod,
  getOrderedItemCount,
}
