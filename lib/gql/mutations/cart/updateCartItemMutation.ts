import { cartItemDetails } from "./../../fragments/cart"
export const updateCartItemMutation = `
${cartItemDetails}

mutation updateCurrentCartItem($cartItemId:String!, $cartItemInput: CartItemInput){
    updateCurrentCartItem(cartItemId:$cartItemId, cartItemInput:$cartItemInput){
        ...cartItemDetails
    }
}
`
