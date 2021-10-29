type Category = {
  categoryId: Number
  categoryCode: String
}

interface uiHelpersReturnType {
  getCatLink?: (category: Category) => string
}

const useUiHelpers = (): uiHelpersReturnType => {
  const getCatLink = (category: Category) => {
    return `/c/${category.categoryCode}`
  }
  return {
    getCatLink,
  }
}

export default useUiHelpers
