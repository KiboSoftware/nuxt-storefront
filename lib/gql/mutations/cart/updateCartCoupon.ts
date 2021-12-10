import { cartDetails } from "@/lib/gql/fragments"

export const updateCartCouponMutation = `
${cartDetails}

mutation updateCartCoupon($cartId: String!, $couponCode: String!) {
    updateCartCoupon(cartId: $cartId, couponCode: $couponCode) {
        ...cartDetails
    }
}`
