const getMethodCode = (shippingMethod) => shippingMethod.shippingMethodCode
const getMethodName = (shippingMethod) => shippingMethod.shippingMethodName
const getCurrencyCode = (shippingMethod) => shippingMethod.currencyCode
const getPrice = (shippingMethod) => shippingMethod.price

const ShippingRate = (shippingMethod) => {
  return {
    shippingMethodCode: getMethodCode(shippingMethod),
    shippingMethodName: getMethodName(shippingMethod),
    currencyCode: getCurrencyCode(shippingMethod),
    price: getPrice(shippingMethod),
  }
}

const getShippingRates = (shippingMethods) => {
  return shippingMethods.map((shippingMethod) => ShippingRate(shippingMethod))
}

export const shippingMethodGetters = {
  getMethodCode,
  getMethodName,
  getCurrencyCode,
  getPrice,

  ShippingRate,
  getShippingRates,
}

// return shippingMethods.map((shippingMethod) => ({
//   isOpen: false,
//   price: getPrice(shippingMethod),
//   delivery: "",
//   label: getMethodName(shippingMethod),
//   value: getMethodCode(shippingMethod),
//   description: "",
// }))
