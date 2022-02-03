const getMethodCode = (shippingMethod) => shippingMethod.code
const getMethodName = (shippingMethod) => shippingMethod.name
const getCurrencyCode = (shippingMethod) => shippingMethod.method
const getPrice = (shippingMethod) => shippingMethod.price

const ShippingRate = (shippingMethod) => {
  return {
    shippingMethodCode: getMethodCode(shippingMethod),
    shippingMethodName: getMethodName(shippingMethod),
    currencyCode: getCurrencyCode(shippingMethod),
    price: getPrice(shippingMethod),
  }
}

export const shippingMethodGetters = {
  getMethodCode,
  getMethodName,
  getCurrencyCode,
  getPrice,

  ShippingRate,
}
