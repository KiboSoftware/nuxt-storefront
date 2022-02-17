import { useCategoryTree } from "./../useCategoryTree"

const response = {
  categoriesTree: {
    items: [
      {
        categoryId: 3,
        categoryCode: "32",
        isDisplayed: true,
        content: {
          name: "Accessories",
          slug: "accessories",
          description: "",
        },
        childrenCategories: [
          {
            categoryId: 1286,
            categoryCode: "41",
            isDisplayed: true,
            content: {
              name: "Action Cameras",
              slug: "action-cameras",
              description: "",
            },
            updateDate: "",
          },
        ],
        updateDate: "",
      },
    ],
    totalCount: 0,
  },
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: response,
      }),
    },
  }),
}))

describe("[composable] useCategoryTree", () => {
  const { load, categories: allCategories, loading, error } = useCategoryTree()

  test("categoryTree: should get categoryTree", async () => {
    await load()
    expect(allCategories.value).toEqual(response.categoriesTree.items)
    expect(loading.value).toBeFalsy()
    expect(error.value).toEqual({ value: null })
  })
})
