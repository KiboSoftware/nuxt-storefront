import type { PrCategory } from "../../server/types/GraphQL"

import type { uiHelpersReturnType } from "../types"

const useUiHelpers = (): uiHelpersReturnType => {
  const getCatLink = (category: PrCategory) => {
    return `/c/${category.categoryCode}`
  }
  return {
    getCatLink,
  }
}

export default useUiHelpers
