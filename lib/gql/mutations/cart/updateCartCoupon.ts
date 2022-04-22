import { cartDetails } from "@/lib/gql/fragments"

export const updateCartCouponMutation = /* GraphQL */ `
  ${cartDetails}

  mutation updateCartCoupon($cartId: String!, $couponCode: String!) {
    updateCartCoupon(cartId: $cartId, couponCode: $couponCode) {
      ...cartDetails
    }
  }
`
