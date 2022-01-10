import { CrProduct } from "@/server/types/GraphQL"

export type CrDiscount = {
  id: String
  name?: String
}

export type CrAppliedDiscount = {
  couponCode?: [String]
  discount?: CrDiscount
  impact?: Number
}

export type CartItem = {
  id: String
  product: CrProduct
  quantity: Number
}

export type Cart = {
  id?: String
  orderDiscounts?: CrAppliedDiscount
  subtotal?: Number
  discountedTotal?: Number
  discountTotal?: Number
  discountedSubtotal?: Number
  shippingTotal?: Number
  total?: Number
  invalidCoupons?: {
    couponCode: String
  }
  couponCodes?: [string]
  items?: CartItem
}
