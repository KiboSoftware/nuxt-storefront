import { cartDetails } from "@/lib/gql/fragments"

export const deleteCurrentCartItemsMutation = /* GraphQL */ `
  ${cartDetails}

  mutation deleteCurrentCartItems {
    deleteCurrentCartItems {
      ...cartDetails
    }
  }
`
