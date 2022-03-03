import { format } from "date-fns"
import { Order } from "@/server/types/GraphQL"

const getOrderNumber = (order: Order) => order?.orderNumber

const getId = (order: Order) => order?.id

const getSubmittedDate = (order: Order) =>
  order?.submittedDate
    ? format(new Date(order?.submittedDate), "EEEE, MMMM dd, yyyy")
    : order?.submittedDate

const getExpectedDeliveryDate = (order: Order) =>
  order?.items[0]?.expectedDeliveryDate
    ? format(new Date(order?.items[0]?.expectedDeliveryDate), "EEEE, MMMM dd, yyyy")
    : order?.items[0]?.expectedDeliveryDate

const getProductNames = (order: Order) => {
  const productNames = order?.items.map((item) => item.product.name)
  return productNames.join(",")
}

const getOrderTotal = (order: Order) => order?.total

const getOrderStatus = (order: Order) => order?.status

export const orderGetters = {
  getOrderNumber,
  getId,
  getSubmittedDate,
  getProductNames,
  getOrderTotal,
  getOrderStatus,
  getExpectedDeliveryDate,
}
