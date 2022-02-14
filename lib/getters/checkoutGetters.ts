const getOrderNumber = (checkout) => checkout?.orderNumber
const getEmail = (checkout) => checkout?.email
const getId = (checkout) => checkout?.id
const getTotalToDisplay = (checkout) => "$" + `${checkout?.total ? checkout?.total.toFixed(2) : 0}`
const getTotal = (checkout): number => (checkout?.total ? checkout?.total.toFixed(2) : 0)
const getDiscountedTotal = (checkout) => checkout?.orderDiscounts
const getShippingTotal = (checkout) => checkout?.shippingTotal
const getTaxTotal = (checkout) => checkout?.taxTotal
const getSubtotal = (checkout) => "$" + `${checkout?.subtotal ? checkout?.subtotal?.toFixed(2) : 0}`
const getLineItemTotal = (checkout) => {
  return checkout?.items
    ? checkout?.items?.reduce((previous, current) => {
        return previous + current?.quantity
      }, 0)
    : 0
}
const getLineItemTaxTotal = () => 0
const getItemsByFulfillment = (checkout, fulfillmentMethod) =>
  checkout?.items?.filter((lineItem) => lineItem.fulfillmentMethod === fulfillmentMethod)
const getPickupItems = (checkout) => getItemsByFulfillment(checkout, "Pickup")
const getShipItems = (checkout) => getItemsByFulfillment(checkout, "Ship")
const getDeliveryItems = (checkout) => getItemsByFulfillment(checkout, "Delivery")

const getShippingMethod = (checkout) => {
  return checkout?.items?.shippingTotal ? "$" + `${checkout?.items?.shippingTotal}` : "FREE"
}

export const checkoutGetters = {
  getOrderNumber,
  getEmail,
  getId,
  getTotalToDisplay,
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
}
