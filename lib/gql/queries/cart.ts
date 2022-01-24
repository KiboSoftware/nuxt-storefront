import { cartDetails } from "../fragments/cart"

export const getCartQuery = /* GraphQL */`
${cartDetails}

query cart {
  currentCart {
    ...cartDetails
  }
}
`
