import { buildBreadcrumbs } from "../helpers/buildBreadcrumbs"
import { Breadcrumb } from "~~/pages/types"
import { Maybe, PrCategory } from "~~/server/types/GraphQL"

const getCategoryTree = (searchData: { categories: Maybe<Array<Maybe<PrCategory>>> }) => {
  if (!searchData) {
    return []
  }
  return searchData?.categories
}

const getBreadcrumbs = (searchData: {
  categories: Maybe<Array<Maybe<PrCategory>>>
}): Breadcrumb[] => {
  if (!searchData) {
    return []
  }
  let bcs
  if (searchData && searchData?.categories && searchData?.categories[0]) {
    bcs = [
      { text: "Home", link: "/" },
      ...buildBreadcrumbs(searchData?.categories[0]).map((b) => ({
        ...b,
        link: `/c/${b.link}`,
      })),
    ]
  }
  return bcs || []
}

export const facetGetters = {
  getBreadcrumbs,
  getCategoryTree,
}
