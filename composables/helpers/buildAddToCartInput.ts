import type { CartItemInput, CrProductOptionInput } from "@/server/types/GraphQL"
import { ProductCustom } from "../types"

export const buildAddToCartInput = ({
  product,
  quantity,
  options,
}: {
  product: ProductCustom
  quantity: number
  options: Array<CrProductOptionInput>
}): CartItemInput => {
  return {
    product: {
      options,
      productCode: product?.productCode || "",
      variationProductCode: product?.variationProductCode || "",
    },
    quantity,
    fulfillmentMethod: product?.fulfillmentMethodShortName,
    purchaseLocation: product?.purchaseLocationCode,
  }
}
