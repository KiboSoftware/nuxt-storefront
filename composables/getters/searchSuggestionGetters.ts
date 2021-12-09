import { SearchSuggestionResult } from "~~/server/types/GraphQL"

export const getSearchSuggestions = (suggestionSearch: SearchSuggestionResult) => {
  const productSuggeastionGroup = suggestionSearch.suggestionGroups.find(
    (sg) => sg.name === "Pages"
  )
  const products = productSuggeastionGroup?.suggestions?.map((p) => {
    return {
      productCode: p?.suggestion?.productCode,
      productImageUrls: p?.suggestion?.productImageUrls,
      productName: p?.suggestion?.productName,
    }
  })
  const categorySuggeastionGroup = suggestionSearch.suggestionGroups.find(
    (sg) => sg.name === "Categories"
  )
  const categories = categorySuggeastionGroup?.suggestions
    ?.map((p) => {
      return {
        categoryCode: p?.suggestion?.categoryCode,
        categoryId: p?.suggestion?.categoryId,
        name: p?.suggestion?.content?.name,
        isDisplayed: p?.suggestion?.isDisplayed,
      }
    })
    .filter((cat) => cat.isDisplayed)

  return { products, categories }
}
export const searchSuggestionGetters = {
  getSearchSuggestions,
}
