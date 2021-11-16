import { buildBreadcrumbs } from "../helpers/buildBreadcrumbs"
import { Breadcrumb } from "~~/pages/types"
import { Product, ProductOption, ProductOptionValue } from "~~/server/types/GraphQL"

const ratingAttrFQN = `tenant~rating`
export const getName = (product: Product) => product?.content?.productName

export const getRating = (product: Product) => {
  const attr = product?.properties?.find((property) => property?.attributeFQN === ratingAttrFQN)
  return attr?.values?.pop()?.value
}
export const getPrice = (product: Product): { regular: number; special: number } => {
  return {
    regular: product?.price?.price || 0,
    special: product?.price?.salePrice || 0,
  }
}
export const getSalePrice = (product: Product): number => product?.price?.salePrice || 0

export const getSlug = (product: Product): string => product?.content?.seoFriendlyUrl || ""

export const getCoverImage = (product: Product): string =>
  product?.content?.productImages?.[0]?.imageUrl || ""

export const getDescription = (product: Product): string =>
  product?.content?.productFullDescription || ""

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
  return selectedValue?.value || selectedValue?.stringValue
}
export const getOptionName = (option: ProductOption): string => option?.attributeDetail?.name || ""
export const getOptions = (product: Product) => product?.options

export const productGetters = {
  getName,
  getRating,
  getPrice,
  getSalePrice,
  getDescription,
  getSFProductGallery,
  getBreadcrumbs,
  getProperties,
  getOptionSelectedValue,
  getOptionName,
  getOptions,
  getSlug,
  getCoverImage,
}
