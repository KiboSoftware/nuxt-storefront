import { FulFillmentOption } from "@/composables/types/fulfillmentOption"
import { CartItem, Location } from "@/server/types/GraphQL"

export type StoreLocatorModalProps = {
  setFulfillment?: (
    selectedFulfillmentValue: string,
    shortName: string,
    purchaseLocation: Location
  ) => void
  selectedFulfillmentValue?: string
  fulfillmentOption?: FulFillmentOption
  updateCartItem?: (cartItemId: string, cartItemInput: CartItem) => CartItem
  cartItemId?: string
  cartItemInput?: CartItem
}
