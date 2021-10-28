/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from "../types"
export const getMegaMenuCategory = (categories: []) => {
  return categories
    ?.filter(
      (category: Category) =>
        category.childrenCategories?.length && category.isDisplayed
    )
    .filter((category, indx) => indx < 4)
}

export const categoryGetters = {
  getMegaMenuCategory,
}
