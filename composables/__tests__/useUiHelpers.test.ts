import { useUiHelpers } from "@/composables"
import { PrCategory } from "@/server/types/GraphQL"
import { useNuxtApp } from "#app"

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      app: {
        router: {
          history: {
            current: {
              query: {
                categoryCode: "40",
                page: 0,
                itemsPerPage: 20,
                filters: "Tenant~color:black,Tenant~color:blue",
              },
              params: { categoryCode: "40" },
            },
          },
          back: jest.fn(),
          push: jest.fn(),
        },
      },
    },
  }),
}))

jest.mock("@/lib/operations/get-page", () => {
  return {
    getPage: () => {
      return Promise.resolve({ components: [] })
    },
  }
})

describe("[composable] useUiHelpers", () => {
  const category: PrCategory = {
    count: 0,
    categoryId: 58,
    categoryCode: "mens",
    content: {
      name: "Mens",
      slug: "mens",
      description: "",
    },
    updateDate: "01-01-2020",
  }
  const facetsFromURL = {
    categoryCode: "40",
    page: -1,
    itemsPerPage: 20,
    filters: ["Tenant~color:black", "Tenant~color:blue"],
    phrase: undefined,
    sort: undefined,
  }
  const productCode = "MS-JKT-012"
  const { getCatLink, getFacetsFromURL, getProductLink } = useUiHelpers()

  test("getCatlink", () => {
    const catLink = getCatLink(category)
    expect(catLink).toEqual("/category/mens")
  })

  test("setTermForUrl", () => {
    const routerPushMock = jest.spyOn(useNuxtApp().nuxt2Context.app.router, "push")
    const { setTermForUrl } = useUiHelpers()
    setTermForUrl("test")
    expect(routerPushMock).toHaveBeenCalled()
  })

  test("getFacetsFromURL", () => {
    const facets = getFacetsFromURL()
    expect(facets).toEqual(facetsFromURL)
  })

  test("getProductLink", () => {
    const prodLink = getProductLink(productCode)
    expect(prodLink).toEqual("/product/MS-JKT-012")
  })

  test("changeFilters", () => {
    const routerPushMock = jest.spyOn(useNuxtApp().nuxt2Context.app.router, "push")
    const { changeFilters } = useUiHelpers()
    changeFilters("test")
    expect(routerPushMock).toHaveBeenCalled()
  })

  test("changeSorting", () => {
    const routerPushMock = jest.spyOn(useNuxtApp().nuxt2Context.app.router, "push")
    const { changeSorting } = useUiHelpers()
    changeSorting("test")
    expect(routerPushMock).toHaveBeenCalled()
  })

  test("goBackToPreviousRoute", () => {
    const routerBackMock = jest.spyOn(useNuxtApp().nuxt2Context.app.router, "back")
    const { goBackToPreviousRoute } = useUiHelpers()
    goBackToPreviousRoute()
    expect(routerBackMock).toHaveBeenCalled()
  })

  test("setCategoryLink", () => {
    const routerPushMock = jest.spyOn(useNuxtApp().nuxt2Context.app.router, "push")
    const { setCategoryLink } = useUiHelpers()
    setCategoryLink(false, { count: 1 })
    expect(routerPushMock).toHaveBeenCalled()
  })
})
