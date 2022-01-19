import type { Maybe, PrCategory } from "~~/server/types/GraphQL"

function addParent(category: PrCategory, newParent: PrCategory): void {
  if (category.parentCategory) return addParent(category.parentCategory, newParent)
  category.parentCategory = Object.assign({}, newParent)
}

let targetCategory: PrCategory
export const selectCategoryFromTree = (
  categoryTree: Array<PrCategory> = [],
  categoryCode: string
): PrCategory => {
  const findCategoryById = (category: Maybe<PrCategory>, code: string) => {
    if (category?.categoryCode === code) {
      targetCategory = Object.assign({}, category)
      return true
    }
    return category?.childrenCategories?.find(
      (childCategory: Maybe<PrCategory>) => {
        const found = findCategoryById(childCategory, code)
        if (found) {
          addParent(targetCategory, category)
          return true
        }
        return false
      }
    )
  }
  for (const rootCategory of categoryTree) {
    if (findCategoryById(rootCategory, categoryCode)) {
      continue
    }
  }
  return targetCategory
}
