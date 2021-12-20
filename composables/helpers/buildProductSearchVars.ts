import { QueryProductSearchArgs } from "@/server/types/GraphQL"

function getFacetValueFilter(categoryCode, filters = []) {
  let facetValueFilter = ""
  if (categoryCode) {
    facetValueFilter = `categoryCode:${categoryCode},`
  }
  return facetValueFilter + filters.join(",")
}

export const buildProductSearchVars = ({
  categoryCode = "",
  pageSize = 20,
  filters = {},
  startIndex = 0,
  sort = "",
  search = "",
}: {
  categoryCode: string
  pageSize?: number
  filters?: {}
  startIndex?: number
  sort?: string
  search?: string
}): QueryProductSearchArgs => {
  let facetTemplate = ""
  let facetHierValue = ""
  if (categoryCode) {
    facetTemplate = `categoryCode:${categoryCode}`
    facetHierValue = `categoryCode:${categoryCode}`
  }
  const facetFilterList = Object.keys(filters)
    .filter((k) => filters[k].length)
    .reduce((accum, k) => {
      return [
        ...accum,
        ...filters[k].map((facetValue) => {
          if (k === "Price" || k === "price") return facetValue
          return `Tenant~${k}:${facetValue}`
        }),
      ]
    }, [])
  const facetValueFilter = getFacetValueFilter(categoryCode, facetFilterList)
  return {
    query: search,
    startIndex,
    pageSize,
    sortBy: sort,
    facetHierValue,
    facetTemplate,
    facetValueFilter,
  }
}
