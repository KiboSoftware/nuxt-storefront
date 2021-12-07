import { getCurrentInstance, ref } from "@vue/composition-api"
import type { uiHelpersReturnType } from "./types"

import type { PrCategory } from "~~/server/types/GraphQL"

export const useUiHelpers = (): uiHelpersReturnType => {
  const router = ref()
  const vm = getCurrentInstance()
  router.value = vm?.root.type.router

  const getCatLink = (category: PrCategory) => {
    return `/c/${category.categoryCode}`
  }

  const getFacetsFromURL = () => {
    const { params } = router.value.history.current
    const categoryCode = Object.keys(params).reduce(
      (prev, curr) => params[curr] || prev,
      params.slug_1
    )
    const filters = {}

    return {
      categoryCode,
      page: 1,
      itemsPerPage: 20,
      phrase: "",
      filters,
      sort: "",
    }
  }

  const getProductLink = (productCode: string) => {
    return `/product/${productCode}`
  }

  return {
    getCatLink,
    getFacetsFromURL,
    getProductLink,
  }
}
