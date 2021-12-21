import { buildBreadcrumbs } from "@/composables/helpers/buildBreadcrumbs"
import { Breadcrumb } from "@/pages/types"
import { Facet, Maybe, PrCategory } from "@/server/types/GraphQL"

const getCategoryTree = (searchData: { categories: Maybe<Array<Maybe<PrCategory>>> }) => {
  if (!searchData) return []
  return searchData?.categories
}

const getBreadcrumbs = (searchData: {
  categories: Maybe<Array<Maybe<PrCategory>>>
}): Breadcrumb[] => {
  const homeCrumb = [{ text: "Home", link: "/" }]
  if (!searchData?.categories?.[0]) {
    return homeCrumb
  }
  const categoryCrumbs = buildBreadcrumbs(searchData?.categories[0]).map((b) => ({
    ...b,
    link: `/c/${b.link}`,
  }))

  return [...homeCrumb, ...categoryCrumbs]
}

const getFacetName = (facet: Facet) => facet?.label
const getFacetField = (facet: Facet) => facet?.field
const getFacetValues = (facet: Facet) => facet?.values

export const facetGetters = {
  getBreadcrumbs,
  getCategoryTree,
  getFacetField,
  getFacetName,
  getFacetValues,
}
