/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PrCategory } from "@/server/types/GraphQL"

export const getMegaMenuCategory = (categories: PrCategory[]) => {
  return categories
    .slice()
    ?.filter((category: PrCategory) => category.childrenCategories?.length && category.isDisplayed)
    .filter((category, indx) => indx < 4)
}

const getName = (category: PrCategory) => category?.content?.name

const getCategoryCode = (category: PrCategory) => category?.categoryCode

const getParentCategory = (categories: PrCategory[], categoryCode: String | Number) => {
  const parentCategoryTree = { value: [] }
  const findCategoryByCode = (category: PrCategory, code: String | Number) => {
    if (category?.categoryCode === code) {
      parentCategoryTree.value = categories
      return true
    }
    return category?.childrenCategories?.find((childCategory: PrCategory) => {
      const found = findCategoryByCode(childCategory, code)
      if (found) {
        parentCategoryTree.value = category?.childrenCategories
        return true
      }
      return false
    })
  }
  for (const rootCategory of categories) {
    if (findCategoryByCode(rootCategory, categoryCode)) {
      break
    }
  }
  return parentCategoryTree.value
}

export const categoryGetters = {
  getMegaMenuCategory,
  getName,
  getCategoryCode,
  getParentCategory,
}
