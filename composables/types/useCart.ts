import { ConfigureOption } from "./useProduct"
interface ProductParams {
  productCode?: string | undefined
  variationProductCode?: string
  options?: ConfigureOption[]
}

interface ProductToAdd {
  product?: ProductParams
  quantity: number
  fulfillmentMethod: string
  purchaseLocation: string
}

export type AddItemsToCartParams = {
  productToAdd: ProductToAdd
}
