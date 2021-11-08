import { Breadcrumb } from "~~/pages/types"
import { Product, ProductOption } from "~~/server/types/GraphQL"
import { buildBreadcrumbs } from "../helpers/buildBreadcrumbs"

const ratingAttrFQN = `tenant~rating`
export const getName = (product: Product) => product?.content?.productName

export const getRating = (product: Product) => {
  const attr = product?.properties?.find((property) => property?.attributeFQN === ratingAttrFQN)
  return attr?.values?.pop()?.value
}
export const getPrice = (product: Product): number => product.price?.price || 0
export const getSalePrice = (product: Product): number => product?.price?.salePrice || 0
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
  const reducer = (accum: any, property: any): any => {
    const values = property?.values?.map((val: any) => val?.value || val?.stringValue)
    const key = property?.attributeDetail?.name as string
    accum[key] = values
    return accum
  }
  return product?.properties?.filter((attr) => !attr?.isHidden).reduce(reducer, {})
}
export const getOptionSelectedValue = (option: ProductOption) =>  {
   const selectedValue = option?.values?.find(value => value?.isSelected)
   return selectedValue?.value || selectedValue?.stringValue
}
export const getOptionName = (option:ProductOption): string => option?.attributeDetail?.name || ''
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
  getOptions
}
