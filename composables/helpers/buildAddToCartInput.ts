import type { CartItemInput, CrProductOptionInput } from "@/server/types/GraphQL"
import { ProductCustom } from "@/composables/types"

export const buildAddToCartInput = (
  product: ProductCustom,
  quantity: number,
  options: Array<CrProductOptionInput>
): CartItemInput => {
  return {
    product: {
      options,
      productCode: product?.productCode || "",
      variationProductCode: product?.variationProductCode || "",
    },
    quantity,
    fulfillmentMethod: product?.fulfillmentMethod,
    purchaseLocation: product?.purchaseLocationCode,
  }
}
