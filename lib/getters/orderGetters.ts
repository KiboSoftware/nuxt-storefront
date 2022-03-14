import { format } from "date-fns"
import { Order } from "@/server/types/GraphQL"

const getOrderNumber = (order: Order) => order?.orderNumber

const getId = (order: Order) => order?.id

const getSubmittedDate = (order: Order, withTimestamp?: Boolean) =>
  order?.submittedDate
    ? withTimestamp
      ? format(new Date(order?.submittedDate), "MMMM dd, yyyy, hh:mm a zzz")
      : format(new Date(order?.submittedDate), "MMMM dd, yyyy")
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

const getOrderPayments = (order: Order) => order?.payments

export const orderGetters = {
  getOrderNumber,
  getId,
  getSubmittedDate,
  getProductNames,
  getOrderTotal,
  getOrderStatus,
  getExpectedDeliveryDate,
  getOrderPayments,
}
