/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CategoryCollection, PrCategory } from "../../server/types/GraphQL"
import type {
  AgnosticCategoryTree,
  ProductCategory,
  RootCategory,
} from "../types"

export const getCategoryTree = (
  category: ProductCategory
): AgnosticCategoryTree => {
  const getRoot = (category: ProductCategory): ProductCategory =>
    category.parentCategory ? getRoot(category.parentCategory) : category
  const itemToTree = (rootCategory: RootCategory): AgnosticCategoryTree => {
    return {
      id: rootCategory.categoryCode,
      label: rootCategory.content?.name,
      slug: rootCategory.content?.slug,
      items: rootCategory.childrenCategories?.map(itemToTree) || [],
      isCurrent: rootCategory.categoryCode === category.categoryCode,
    }
  }
  if (category) {
    return itemToTree(getRoot(category))
  }
  return {} as AgnosticCategoryTree
}
export const getMegaMenuCategory = (categories: ProductCategory[]) => {
  return categories
    ?.filter(
      (category: PrCategory) =>
        category.childrenCategories?.length && category.isDisplayed
    )
    .map(getCategoryTree)
    .filter((category, indx) => indx < 4)
}
export const categoryGetters = {
  getMegaMenuCategory,
}
