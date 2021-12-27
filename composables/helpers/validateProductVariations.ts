import * as GraphQL from "@/server/types/GraphQL"

export const isProductVariationsSelected = (product: GraphQL.Product): boolean => {
  // check if product variation options selected
  if (!product?.options && product?.purchasableState?.isPurchasable) {
    return product.purchasableState?.isPurchasable
  }

  const requiredOptions = product?.options?.filter((option) => option?.isRequired === true)
  const selectedOptions = requiredOptions?.map((option) =>
    option?.values?.some((value) => value?.isSelected === true)
  )

  if (selectedOptions && product?.purchasableState?.isPurchasable) {
    return (
      selectedOptions.every((value) => value === true) && product?.purchasableState?.isPurchasable
    )
  }
  return false
}
