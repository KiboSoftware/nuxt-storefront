export const updateCartQuantityMutation = /* GraphQL */`
mutation updateCartItemQuantity($itemId:String!, $quantity: Int!){
    updateCurrentCartItemQuantity(cartItemId:$itemId, quantity:$quantity){
      id
      quantity
    }
}
`
