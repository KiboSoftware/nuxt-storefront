export const createReturnItemMutation = /* GraphQL */ `
  mutation createReturn($returnObjInput: ReturnObjInput) {
    createReturn(returnObjInput: $returnObjInput) {
      customerAccountId
      returnNumber
      returnOrderId
      status
      items {
        orderItemId
        reasons {
          reason
          quantity
        }
        returnType
        product {
          upc
          sku
          productCode
          name
        }
      }
    }
  }
`
