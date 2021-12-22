import { FacetValue, PrCategory } from "./../server/types/GraphQL"
import type { uiHelpersReturnType, getFacetsFromURLResponse } from "./types"
import { useNuxtApp } from "#app"

const nonFilters = ["page", "sort", "phrase", "itemsPerPage"]

export const useUiHelpers = (): uiHelpersReturnType => {
  const nuxt = useNuxtApp()
  const instance = nuxt.nuxt2Context.app
  const getCatLink = (category: PrCategory) => {
    return `/c/${category.categoryCode}`
  }

  const reduceFilters = (query: Record<string, string>) => (prev: {}, curr: string) => {
    const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr)

    return {
      ...prev,
      [curr]: makeArray ? query[curr] : [query[curr]],
    }
  }

  const getFacetsFromURL = (isSearchPage?: boolean) => {
    // eslint-disable-next-line
    const { query, params } = instance.router.history.current
    const categoryCode = !isSearchPage
      ? Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1)
      : query.categoryCode
    const filters = query.filters?.split(",") || []

    return {
      categoryCode,
      page: parseInt(query.page, 10) || 1,
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 20,
      phrase: query.phrase,
      filters,
      sort: query.sort,
    } as getFacetsFromURLResponse
  }

  const changeFilters = (filters) => {
    instance.router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        filters,
      },
    })
  }

  const setTermForUrl = (term: string) => {
    instance.router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        phrase: term || undefined,
      },
    })
  }
  const getFiltersDataFromUrl = (
    instance: { router: { history: { current: { query: Record<string, string> } } } },
    onlyFilters: boolean
  ) => {
    const { query } = instance.router.history.current
    return Object.keys(query)
      .filter((f) => (onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f)))
      .reduce(reduceFilters(query), {})
  }

  const getProductLink = (productCode: string) => {
    return `/product/${productCode}`
  }

  const changeSorting = (sort: string) => {
    const { query } = instance.router.history.current
    instance.router.push({ query: { ...query, sort } })
  }

  const setCategoryLink = (isSearchPage: boolean, facetValue: FacetValue) => {
    const { query } = instance.router.history.current
    if (isSearchPage) {
      instance.router.push({ query: { ...query, categoryCode: facetValue.value } })
    } else {
      instance.router.push({ path: `/c/${facetValue.value}`, query })
    }
  }

  const goBackToPreviousRoute = () => {
    instance.router.back()
  }

  return {
    getCatLink,
    setTermForUrl,
    getFacetsFromURL,
    getProductLink,
    changeFilters,
    changeSorting,
    setCategoryLink,
    goBackToPreviousRoute,
  }
}
