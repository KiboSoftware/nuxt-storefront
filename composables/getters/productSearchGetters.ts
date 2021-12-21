import { ProductSearchResult } from "~~/server/types/GraphQL"

const getProducts = (searchData: ProductSearchResult) => {
  if (!searchData) return []
  return searchData?.items
}
const getFacets = (searchData: ProductSearchResult, facetTypes?: Array<string>) =>
  searchData?.facets?.filter((facet) => !facetTypes || facetTypes.includes(facet.facetType))

export const productSearchGetters = {
  getProducts,
  getFacets,
}
