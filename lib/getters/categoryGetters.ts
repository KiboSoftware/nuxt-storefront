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

const getParentCategory = async (categories: PrCategory[], categoryCode: String | Number) => {
  if (!categories) {
    return
  }
  for (const parent of categories) {
    if (parent.categoryCode.toString() === categoryCode) {
      return categories
    } else if (parent.childrenCategories) {
      await getParentCategory(parent.childrenCategories, categoryCode)
    }
  }
}

export const categoryGetters = {
  getMegaMenuCategory,
  getName,
  getCategoryCode,
  getParentCategory,
}
