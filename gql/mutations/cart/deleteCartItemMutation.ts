export const deleteCartItemMutation = `
mutation deleteCartItem($itemId: String!) {
    deleteCurrentCartItem(cartItemId:$itemId)
}`
