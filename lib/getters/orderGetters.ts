const getSubmittedDate = (order) => order?.submittedDate
const getProductNames = (order) => order?.products
const getOrderTotal = (order) => order?.total
const getOrderStatus = (order) => order?.status

export const orderGetters = {
  getSubmittedDate,
  getProductNames,
  getOrderTotal,
  getOrderStatus,
}
