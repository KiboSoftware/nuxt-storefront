import { ConfigureOption } from "./useProduct"
interface Product {
  productCode?: string | undefined
  variationProductCode?: string
  options?: ConfigureOption[]
}

interface ProductToAdd {
  product?: Product
  quantity: number
  fulfillmentMethod: string
  purchaseLocation: string
}

export type AddItemsToCartParams = {
  productToAdd: ProductToAdd
}
