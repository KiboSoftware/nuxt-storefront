import { Facet, FacetValue, ProductSearchResult } from "@/server/types/GraphQL"

const getProducts = (searchData: ProductSearchResult) => {
  if (!searchData) return []
  return searchData?.items
}
const getFacets = (searchData: ProductSearchResult, facetTypes?: Array<string>) =>
  searchData?.facets?.filter((facet) => !facetTypes || facetTypes.includes(facet.facetType))

const getFacetByName = (searchData: ProductSearchResult, facetName: string) => {
  return searchData?.facets?.find((facet: Facet) => facet.field === facetName)
}

const getCategoryFacet = (isSearchPage, productSearchResult, categoryCode) => {
  let header: string, children: FacetValue[]
  const facetName = "CategoryCode"

  // Searching categories by facetName i.e. : CategoryCode
  if (!categoryCode && isSearchPage) {
    children = getFacetByName(productSearchResult, facetName)?.values
  } else {
    const facet = getFacetByName(productSearchResult, facetName)
    const parent = facet?.values?.find((facet) => categoryCode === facet.value)
    header = parent?.label
    children = parent?.childrenFacetValues
  }
  return { header, children }
}

const getTotalProducts = (searchData: ProductSearchResult) => {
  return searchData?.totalCount
}

export const productSearchGetters = {
  getProducts,
  getFacets,
  getFacetByName,
  getCategoryFacet,
  getTotalProducts,
}
