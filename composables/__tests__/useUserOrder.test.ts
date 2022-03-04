import { useUserOrder } from "../useUserOrder"

const searchOrderResponse = {
  data: {
    orders: {
      pageCount: 0,
      items: [
        {
          submittedDate: null,
          id: "1313b457213c7a00016b1923000045a4",
          orderNumber: 36,
          status: "Pending",
          total: 3425,
          items: [
            {
              product: {
                productCode: "MS-JKT-013",
                name: "Stingray Shell Jacket",
              },
              quantity: 5,
              total: 1000,
            },
          ],
        },
      ],
    },
  },
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: searchOrderResponse.data,
      }),
    },
  }),
}))

describe("[composable] useUserOrder", () => {
  const { result, getOrders, loading, error } = useUserOrder(`search-orders`)
  test("search: should search products and save as result", async () => {
    await getOrders({ filters: "" })
    expect(result.value).toStrictEqual(searchOrderResponse.data.orders)
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
  })
})
