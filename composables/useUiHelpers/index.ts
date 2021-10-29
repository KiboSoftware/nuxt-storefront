type Category = {
  id?: Number
  name?: String
  slug?: String
}

interface uiHelpersReturnType {
  getCatLink?: (category: Category) => string
}

const useUiHelpers = (): uiHelpersReturnType => {
  const getCatLink = (category: Category) => {
    return `/c/${category.slug}/${category.id}`
  }
  return {
    getCatLink,
  }
}

export default useUiHelpers
