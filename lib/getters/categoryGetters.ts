/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PrCategory } from "@/server/types/GraphQL"

export const getMegaMenuCategory = (categories: PrCategory[]) => {
  return categories
    ?.slice()
    ?.filter((category: PrCategory) => category.childrenCategories?.length && category.isDisplayed)
    ?.filter((category, indx) => indx < 4)
}

const getName = (category: PrCategory) => category?.content?.name

const getCategoryCode = (category: PrCategory) => category?.categoryCode

const getParentCategory = (categories: PrCategory[], categoryCode: String | Number) => {
  const parentCategoryTree = { value: [] }
  const findCategoryByCode = (
    category: PrCategory,
    code: String | Number,
    parentCategory: PrCategory[]
  ) => {
    if (category?.categoryCode === code) {
      parentCategoryTree.value = parentCategory
      return true
    }
    return category?.childrenCategories?.find((childCategory: PrCategory) => {
      const found = findCategoryByCode(childCategory, code, category?.childrenCategories)
      if (found) {
        return true
      }
      return false
    })
  }
  for (const rootCategory of categories) {
    if (findCategoryByCode(rootCategory, categoryCode, categories)) {
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
