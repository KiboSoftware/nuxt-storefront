<<<<<<< HEAD
import { buildBreadcrumbs } from "@/composables/helpers/buildBreadcrumbs"
import { Breadcrumb } from "@/pages/types"
import { Product, ProductOption, ProductOptionValue } from "@/server/types/GraphQL"
import { Location } from "@/composables/types/storeFinder"
=======
import { buildBreadcrumbs } from "../helpers/buildBreadcrumbs"
import { Breadcrumb } from "~~/pages/types"
import {
  Product,
  ProductOption,
  ProductOptionValue,
  SearchSuggestionResult,
} from "~~/server/types/GraphQL"
>>>>>>> 17704dd (feat(search) : implement search type ahead resolve conflicts)

const ratingAttrFQN = `tenant~rating`
export const getName = (product: Product) => product?.content?.productName

export const getProductId = (product: Product): string => product?.productCode || ""

export const getRating = (product: Product) => {
  const attr = product?.properties?.find((property) => property?.attributeFQN === ratingAttrFQN)
  return attr?.values?.pop()?.value
}
export const getProductTotalReviews = (): number => 0
export const getPrice = (product: Product): { regular: number; special: number } => {
  return {
    regular: product?.price?.price || 0,
    special: product?.price?.salePrice || 0,
  }
}
export const getSalePrice = (product: Product): number => product?.price?.salePrice || 0

export const getCoverImage = (product: Product): string =>
  product?.content?.productImages?.[0]?.imageUrl || ""

export const getDescription = (product: Product): string =>
  product?.content?.productFullDescription || ""
export const getShortDescription = (product: Product): string =>
  product?.content?.productShortDescription || ""
export const getSFProductGallery = (product: Product) => {
  return product?.content?.productImages?.map((content) => ({
    mobile: { url: content?.imageUrl },
    desktop: { url: content?.imageUrl },
    big: { url: content?.imageUrl },
    alt: content?.altText || product?.content?.productName,
  }))
}

export const getBreadcrumbs = (product: Product): Breadcrumb[] => {
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
export const getProperties = (product: Product) => {
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
export const getOptionSelectedValue = (option: ProductOption) => {
  const selectedValue = option?.values?.find((value) => value?.isSelected)
  const result = selectedValue?.value || selectedValue?.stringValue || selectedValue?.isSelected
  return result
}
export const getOptionName = (option: ProductOption): string => option?.attributeDetail?.name || ""
export const getOptions = (product: Product) => product?.options
export const getFullfillmentOptions = (product: Product, purchaseLocation: Location) => {
  const nuxt = useNuxtApp()
  const fullfillmentOptions = nuxt.nuxt2Context.$config.fullfillmentOptions

  const result = fullfillmentOptions.map((option) => ({
    name: "fulfillment",
    value: option.value,
    label: option.label,
    details:
      option.value === "DirectShip"
        ? option.details
        : purchaseLocation?.name
        ? `${option.details}: ${purchaseLocation.name}`
        : "",
    required: option.isRequired,
    disabled:
      product?.fulfillmentTypesSupported?.filter(
        (type) => type.toLowerCase() === option.value.toLowerCase()
      ).length === 0,
  }))

  return result
}

export const getSegregatedOptions = (product: Product) => {
  const options = product?.options
  if (!options) return

  const nuxt = useNuxtApp()
  const colorAttributeFQN = nuxt.nuxt2Context.$config.colorAttributeFQN
  const sizeAttributeFQN = nuxt.nuxt2Context.$config.sizeAttributeFQN
  const colorAndSizeOptions = [colorAttributeFQN, sizeAttributeFQN]

  const colourOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === colorAttributeFQN.toLowerCase()
  )

  const sizeOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === sizeAttributeFQN.toLowerCase()
  )

  const listOptions = options?.filter(
    (option) =>
      option?.attributeDetail?.inputType?.toLowerCase() === "list" &&
      !colorAndSizeOptions.includes(option?.attributeFQN)
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

export const productGetters = {
  getName,
  getRating,
  getProductTotalReviews,
  getPrice,
  getSalePrice,
  getDescription,
  getShortDescription,
  getSFProductGallery,
  getBreadcrumbs,
  getProperties,
  getOptionSelectedValue,
  getOptionName,
  getOptions,
  getSegregatedOptions,
  getFullfillmentOptions,
  getCoverImage,
  getProductId,
}
