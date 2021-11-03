import type { PrCategory } from "../server/types/GraphQL"

import type { uiHelpersReturnType } from "./types"

export const useUiHelpers = (): uiHelpersReturnType => {
  const getCatLink = (category: PrCategory) => {
    return `/c/${category.categoryCode}`
  }
  return {
    getCatLink,
  }
}
