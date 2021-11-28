import { cartDetails } from "../fragments/cart"

export const getCartQuery = `
${cartDetails}

query cart {
  currentCart {
    ...cartDetails
  }
}
`
