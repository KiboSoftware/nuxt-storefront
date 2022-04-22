import { FacetResultsData } from "@/composables/types/facetGetterType"
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
const getSortOptions = (searchData: FacetResultsData, sortOptions) => {
  const options = sortOptions.map((option) => ({
    ...option,
    selected: option.id === searchData.input?.sort,
  }))

  const selected = options.find((option) => option.selected)?.id || ""

  return { options, selected }
}

const getSelectedFacets = (facets: Facet[]) => {
  if (!facets) return []
  const selectedFacets = facets?.map((f) => f?.values?.filter((value) => value.isApplied))
  return selectedFacets.flat()
}

const getPagination = (searchData: FacetResultsData) => {
  if (!searchData) {
    return {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 5,
      pageOptions: [],
    }
  }

  return {
    currentPage: searchData.startIndex || 1,
    totalPages: searchData.pageCount || 1,
    totalItems: searchData.totalCount || 0,
    itemsPerPage: searchData.pageSize || 10,
  }
}

export const facetGetters = {
  getBreadcrumbs,
  getCategoryTree,
  getFacetField,
  getFacetName,
  getFacetValues,
  getSortOptions,
  getPagination,
  getSelectedFacets,
}
