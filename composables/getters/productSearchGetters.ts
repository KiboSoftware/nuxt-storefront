import { ProductSearchResult } from "~~/server/types/GraphQL"

const getProducts = (searchData: ProductSearchResult) => {
  if (!searchData) return []
  return searchData?.items
}

export const productSearchGetters = {
  getProducts,
}
