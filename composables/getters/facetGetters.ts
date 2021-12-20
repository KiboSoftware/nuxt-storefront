import { buildBreadcrumbs } from "@/composables/helpers/buildBreadcrumbs"
import { Breadcrumb } from "@/pages/types"
import { Maybe, PrCategory } from "@/server/types/GraphQL"
import { FacetResultsData } from "@/composables/types/facetGetterType"

const normalizeFacet = (facet) => {
  return {
    type: "attribute",
    id: facet.value,
    value: facet.filterValue,
    attrName: facet.label,
    selected: facet.isApplied,
    count: facet.count,
  }
}

const normalizeFacetGroup = (facets = []) => {
  return facets.map((facetGroup) => {
    return {
      id: facetGroup.label,
      label: facetGroup.label,
      options: facetGroup.values.map(normalizeFacet),
      count: null,
      showAll: false,
    }
  })
}

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

const getGrouped = (searchData: FacetResultsData, criteria?: string[]) => {
  const facets = searchData?.facets || []
  const includedFacets = facets.filter((facet) => criteria.includes(facet.field.toLowerCase()))
  return normalizeFacetGroup(includedFacets)
}

export const facetGetters = {
  getBreadcrumbs,
  getCategoryTree,
  getGrouped,
}
