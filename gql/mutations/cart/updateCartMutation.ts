export const updateCartQuantityMutation = `
mutation updateCartItemQuantity($itemId:String!, $quantity: Int!){
    updateCurrentCartItemQuantity(cartItemId:$itemId, quantity:$quantity){
      id
      quantity
    }
}
`
