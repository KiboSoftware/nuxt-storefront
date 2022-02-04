const getMethodCode = (shippingMethod) => shippingMethod.shippingMethodCode
const getMethodName = (shippingMethod) => shippingMethod.shippingMethodName
const getCurrencyCode = (shippingMethod) => shippingMethod.currencyCode
const getPrice = (shippingMethod) => shippingMethod.price

const getShippingRates = (shippingMethods) => {
  if (!shippingMethods) return []

  return shippingMethods.map((shippingMethod) => ({
    shippingMethodCode: getMethodCode(shippingMethod),
    shippingMethodName: getMethodName(shippingMethod),
    currencyCode: getCurrencyCode(shippingMethod),
    price: getPrice(shippingMethod),
  }))
}

const getShippingMethods = (shippingMethods) => {
  return shippingMethods.map((shippingMethod) => ({
    isOpen: "false",
    price: getPrice(shippingMethod),
    delivery: "",
    label: getMethodName(shippingMethod),
    value: getMethodCode(shippingMethod),
    description: "",
  }))
}

export const shippingMethodGetters = {
  getMethodCode,
  getMethodName,
  getCurrencyCode,
  getPrice,

  getShippingRates,
}
