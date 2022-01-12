import * as GraphQL from "@/server/types/GraphQL"

export const isFulfillmentOptionValid = (
  fulfillmentMethod: { value: string; name: string },
  purchaseLocation?: GraphQL.Location
) => {
  if (fulfillmentMethod.value === "DirectShip") return true
  // if fulfillmentMethod is "PickUp In Store"
  // we need to also check if the Purchase Location supports
  if (fulfillmentMethod.value === "InStorePickup" && purchaseLocation?.fulfillmentTypes) {
    const supportedForLocation = purchaseLocation?.fulfillmentTypes?.some(
      (type) => type.name === fulfillmentMethod.name
    )

    return supportedForLocation
  }
  return false
}
