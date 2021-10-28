/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CategoryCollection, PrCategory } from "../../server/types/GraphQL"

export const getMegaMenuCategory = (categories: PrCategory[]) => {
  return categories
    ?.filter(
      (category: PrCategory) =>
        category.childrenCategories?.length && category.isDisplayed
    )
    .filter((category, indx) => indx < 4)
}

export const categoryGetters = {
  getMegaMenuCategory,
}
