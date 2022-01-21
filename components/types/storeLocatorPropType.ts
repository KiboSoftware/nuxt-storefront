import { FulFillmentOption } from "@/composables/types/fulfillmentOption"
import { Location } from "@/server/types/GraphQL"

export type StoreLocatorModalProps = {
  setFulfillment?: (
    selectedFulfillmentValue: string,
    shortName: string,
    purchaseLocation: Location
  ) => void
  selectedFulfillmentValue: ""
  fulfillmentOption: FulFillmentOption
}
