import type { uiHelpersReturnType, Category } from "../types"

const useUiHelpers = (): uiHelpersReturnType => {
  const getCatLink = (category: Category) => {
    return `/c/${category.id}`
  }
  return {
    getCatLink,
  }
}

export default useUiHelpers
