import { Cart } from "@/server/types/GraphQL"

export const normalizeCart = (cart: Cart) => {
  cart.items = cart.items.map((item) => {
    return {
      ...item,
      product: {
        ...item.product,
        fulfillmentTypesSupported: item.product.fulfillmentTypesSupported.map((type) => {
          const types = {
            DirectShip: "Ship",
            InStorePickup: "Pickup",
          }
          return types[type]
        }),
      },
    }
  })

  return cart
}
