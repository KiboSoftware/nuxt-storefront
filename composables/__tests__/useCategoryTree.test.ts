import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import { useCategoryTree } from "../useCategoryTree"
import * as types from "@/server/types/Api"
import apiHelper from "@/utils/apiHelper"

Vue.use(VueCompositionApi)

describe("[composable] useCategoryTree", () => {
  const { load, allCategories, loading, error } = useCategoryTree()
  const getCategoryTreeResponse: types.CategoryTreeResponse = {
    data: {
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
    },
    loading: false,
    networkStatus: 7,
    stale: false,
  }
  const useCategoryTreeResponse =
    getCategoryTreeResponse?.data?.categoriesTree?.items

  // Mock the API response
  jest
    .spyOn(apiHelper, "getCategoryTree")
    .mockReturnValue(Promise.resolve(getCategoryTreeResponse))

  test("should get categoryTree", async () => {
    await load()
    expect(allCategories.value).toEqual(useCategoryTreeResponse)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
