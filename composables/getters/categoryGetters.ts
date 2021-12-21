/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PrCategory } from "../../server/types/GraphQL"

export const getMegaMenuCategory = (categories: PrCategory[]) => {
  return categories
    .slice()
    ?.filter((category: PrCategory) => category.childrenCategories?.length && category.isDisplayed)
    .filter((category, indx) => indx < 4)
}

const getName = (category: PrCategory) => category?.content?.name

const getCategoryCode = (category: PrCategory) => category?.categoryCode

export const categoryGetters = {
  getMegaMenuCategory,
  getName,
  getCategoryCode,
}
