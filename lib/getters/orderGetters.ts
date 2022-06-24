import { format } from "date-fns"
import { Order } from "@/server/types/GraphQL"

const capitalizeWord = (word) => word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

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
const getShippedTo = (order: Order) =>
  capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.firstName) +
  " " +
  capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname)

const getShippingAddress = (order) => order?.fulfillmentInfo?.fulfillmentContact

const getItems = (order: Order) => order?.items || []

const getItemName = (item) => item?.product?.name

const getItemSku = (item) => item?.product?.productCode

const getItemQty = (item) => item?.quantity

const getItemPrice = (item) => item?.total || 0

export const orderGetters = {
  getItems,
  getItemName,
  getItemSku,
  getItemQty,
  getItemPrice,
  getOrderNumber,
  getId,
  getSubmittedDate,
  getProductNames,
  getOrderTotal,
  getOrderStatus,
  getExpectedDeliveryDate,
  getOrderPayments,
  getShippedTo,
  getShippingAddress,
}
