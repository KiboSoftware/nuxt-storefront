const getSubmittedDate = (order) => order?.submittedDate
const getProductNames = (order) => {
  const productNames = order?.items.map((item) => item.product.name)
  return productNames.join(",")
}
const getOrderTotal = (order) => order?.total
const getOrderStatus = (order) => order?.status

export const orderGetters = {
  getSubmittedDate,
  getProductNames,
  getOrderTotal,
  getOrderStatus,
}
