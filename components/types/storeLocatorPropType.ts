import { CartItem } from "@/server/types/GraphQL"

export type StoreLocatorModalProps = {
  setFulfillment?: (selectedFulfillmentValue: string, purchaseLocation: string) => void
  selectedFulfillmentValue?: string
  updateCartItem?: (cartItemId: string, cartItemInput: CartItem) => CartItem
  cartItemId?: string
  cartItemInput?: CartItem
}
