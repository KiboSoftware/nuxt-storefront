import { Facet, ProductSearchResult } from "~~/server/types/GraphQL"

const getProducts = (searchData: ProductSearchResult) => {
  if (!searchData) return []
  return searchData?.items
}
const getFacets = (searchData: ProductSearchResult, facetTypes?: Array<string>) =>
  searchData?.facets?.filter((facet) => !facetTypes || facetTypes.includes(facet.facetType))

const getFacetByName = (searchData: ProductSearchResult) => {
  return searchData?.facets?.find((facet: Facet) => facet.field === "CategoryCode")
}

export const productSearchGetters = {
  getProducts,
  getFacets,
  getFacetByName,
}
