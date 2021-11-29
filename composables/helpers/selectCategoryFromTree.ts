import * as GraphQL from "~~/server/types/GraphQL"
function addParent(category: GraphQL.PrCategory, newParent: GraphQL.PrCategory): void {
  if (category.parentCategory) return addParent(category.parentCategory, newParent)
  category.parentCategory = Object.assign({}, newParent)
}

let targetCategory: GraphQL.PrCategory
export const selectCategoryFromTree = (
  categoryTree: Array<GraphQL.PrCategory> = [],
  categoryCode: string
): GraphQL.PrCategory => {
  const findCategoryById = (category: GraphQL.Maybe<GraphQL.PrCategory>, code: string) => {
    if (category?.categoryCode === code) {
      targetCategory = Object.assign({}, category)
      return true
    }
    return category?.childrenCategories?.find(
      (childCategory: GraphQL.Maybe<GraphQL.PrCategory>) => {
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
