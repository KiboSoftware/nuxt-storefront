import { useCreateOrder } from "../useCreateOrder"

const orderResponse = {
  data: {
    createOrderAction: {
      result: "order response",
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
        data: orderResponse.data,
      }),
    },
  }),
}))

describe("[composable] useCreateOrder", () => {
  const { createOrder, loading, error } = useCreateOrder()
  test("search: create order when params supplied", async () => {
    const response = await createOrder({
      orderId: "432",
    })
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
    expect(response).toStrictEqual(orderResponse.data.createOrderAction)
  })
})
