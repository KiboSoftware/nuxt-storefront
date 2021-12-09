import * as GraphQL from "@/server/types/GraphQL"
// import { Location } from "@/composables/types"

export const isFulfillmentOptionValid = (
  fulfillmentMethod: { value: string; name: string },
  product: GraphQL.Product,
  purchaseLocation?: GraphQL.Location
) => {
  // check if product supports this fulfillmentMethod
  const supportedForProduct = product.fulfillmentTypesSupported.includes(fulfillmentMethod.value)

  // if fulfillmentMethod is "PickUp In Store"
  // we need to also check if the Purchase Location supports
  if (fulfillmentMethod.value === "DirectShip") return supportedForProduct
  else if (fulfillmentMethod.value === "InStorePickup") {
    const supportedForLocation = purchaseLocation?.fulfillmentTypes.some(
      (type) => type.name === fulfillmentMethod.name
    )

    return supportedForProduct && supportedForLocation
  }
}
