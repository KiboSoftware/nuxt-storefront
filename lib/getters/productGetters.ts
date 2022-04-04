import { buildBreadcrumbs, isProductVariationsSelected } from "@/composables/helpers"
import { Breadcrumb } from "@/pages/types"
import {
  Location,
  Product,
  ProductOption,
  ProductOptionValue,
  ProductPriceRange,
} from "@/server/types/GraphQL"
import { ProductCustom } from "@/composables/types"
import { useNuxtApp } from "#app"

const ratingAttrFQN = `tenant~rating`
const getName = (product: ProductCustom) => product?.content?.productName

const getProductId = (product: ProductCustom): string => product?.productCode || ""

const getRating = (product: ProductCustom) => {
  const attr = product?.properties?.find((property) => property?.attributeFQN === ratingAttrFQN)
  return attr?.values?.pop()?.value
}

const getProductTotalReviews = (): number => 0

const getPrice = (product: ProductCustom): { regular: number; special: number } => {
  return {
    regular: product?.price?.price || 0,
    special: product?.price?.salePrice || 0,
  }
}

const getSalePrice = (product: ProductCustom): number => product?.price?.salePrice || 0

const getPriceRange = (product: ProductCustom): ProductPriceRange => product?.priceRange

const getCoverImage = (product: ProductCustom): string =>
  product?.content?.productImages?.[0]?.imageUrl || ""

const getDescription = (product: ProductCustom): string =>
  product?.content?.productFullDescription || ""

const getShortDescription = (product: ProductCustom): string =>
  product?.content?.productShortDescription || ""

const getSFProductGallery = (product: ProductCustom) => {
  return product?.content?.productImages?.map((content) => ({
    mobile: { url: content?.imageUrl },
    desktop: { url: content?.imageUrl },
    big: { url: content?.imageUrl },
    alt: content?.altText || product?.content?.productName,
  }))
}

const getBreadcrumbs = (product: ProductCustom): Breadcrumb[] => {
  const homeCrumb = [{ text: "Home", link: "/" }]
  if (!product?.categories?.[0]) {
    return homeCrumb
  }
  const productCrumbs = buildBreadcrumbs(product?.categories[0]).map((b) => ({
    ...b,
    link: `/c/${b.link}`,
  }))

  return [...homeCrumb, ...productCrumbs]
}

const getProperties = (product: ProductCustom) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reducer = (accum: any, property: any) => {
    const values = property?.values?.map(
      (val: ProductOptionValue) => val?.value || val?.stringValue
    )
    const key = property?.attributeDetail?.name as string
    accum[key] = values
    return accum
  }
  return product?.properties?.filter((attr) => !attr?.isHidden).reduce(reducer, {})
}

const getOptionSelectedValue = (option: ProductOption) => {
  const selectedValue = option?.values?.find((value) => value?.isSelected)
  const result = selectedValue?.value || selectedValue?.stringValue || selectedValue?.isSelected
  return result
}
export const getOptionName = (option: ProductOption): string => option?.attributeDetail?.name || ""
export const getOptions = (product: Product) => product?.options
export const getProductFulfillmentOptions = (product: Product, purchaseLocation: Location) => {
  const nuxt = useNuxtApp()
  const fullfillmentOptions = nuxt.nuxt2Context.$config.fullfillmentOptions

  const result = fullfillmentOptions.map((option) => ({
    value: option.value,
    name: option.name,
    code: option.code,
    label: option.label,
    details:
      option.value === "DirectShip"
        ? option.details
        : purchaseLocation?.name
        ? `${option.details}: ${purchaseLocation.name}`
        : "",
    fulfillmentLocation: purchaseLocation?.name,
    required: option.isRequired,
    shortName: option.shortName,
    disabled:
      product?.fulfillmentTypesSupported?.filter(
        (type) => type.toLowerCase() === option.value.toLowerCase()
      ).length === 0,
  }))

  return result
}

const getSelectedFullfillmentOption = (product: ProductCustom) => {
  const selectedFullfillmentOption = product?.fulfillmentMethod
  return selectedFullfillmentOption
}

const getSegregatedOptions = (product: ProductCustom) => {
  const options = product?.options
  if (!options) return

  const nuxt = useNuxtApp()
  const colorAttributeFQN = nuxt.nuxt2Context.$config.colorAttributeFQN.toLowerCase()
  const sizeAttributeFQN = nuxt.nuxt2Context.$config.sizeAttributeFQN.toLowerCase()

  const colourOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === colorAttributeFQN.toLowerCase()
  )

  const sizeOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === sizeAttributeFQN.toLowerCase()
  )

  const listOptions = options?.filter(
    (option) =>
      option?.attributeDetail?.inputType?.toLowerCase() === "list" &&
      option?.attributeFQN?.toLowerCase() !== colorAttributeFQN.toLowerCase() &&
      option?.attributeFQN?.toLowerCase() !== sizeAttributeFQN.toLowerCase()
  )

  const yesNoOptions = options?.filter(
    (option) => option?.attributeDetail?.inputType?.toLowerCase() === "yesno"
  )

  const textBoxOptions = options?.filter(
    (option) => option?.attributeDetail?.inputType?.toLowerCase() === "textbox"
  )

  const productOptions = {
    colourOptions,
    sizeOptions,
    listOptions,
    yesNoOptions,
    textBoxOptions,
  }

  return productOptions
}

const validateAddToCart = (product: ProductCustom): boolean =>
  isProductVariationsSelected(product) && Boolean(product.fulfillmentMethod)

export const productGetters = {
  getName,
  getRating,
  getProductTotalReviews,
  getPrice,
  getSalePrice,
  getPriceRange,
  getDescription,
  getShortDescription,
  getSFProductGallery,
  getBreadcrumbs,
  getProperties,
  getOptionSelectedValue,
  getOptionName,
  getOptions,
  getSegregatedOptions,
  getSelectedFullfillmentOption,
  getProductFulfillmentOptions,
  getCoverImage,
  getProductId,
  validateAddToCart,
}
