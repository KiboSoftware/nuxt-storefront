import { BreadcrumbsListReturnType } from "./types"
import { PrCategory } from "@/server/types/GraphQL"
const buildBreadcrumbsList = (
  rootCat: PrCategory,
  bc: BreadcrumbsListReturnType
): BreadcrumbsListReturnType => {
  const newBc = [
    ...bc,
    {
      text: rootCat.content?.name,
      link: `${rootCat.content?.slug}/${rootCat.categoryCode}`,
    },
  ]
  const result = rootCat.parentCategory
    ? buildBreadcrumbsList(rootCat.parentCategory, newBc)
    : newBc

  return result
}

export const buildBreadcrumbs = (rootCat: PrCategory) => buildBreadcrumbsList(rootCat, []).reverse()
