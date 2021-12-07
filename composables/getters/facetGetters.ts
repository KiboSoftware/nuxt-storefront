import { buildBreadcrumbs } from "@/composables/helpers/buildBreadcrumbs"
import { Breadcrumb } from "@/pages/types"
import { Maybe, PrCategory } from "@/server/types/GraphQL"

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

export const facetGetters = {
  getBreadcrumbs,
  getCategoryTree,
}
