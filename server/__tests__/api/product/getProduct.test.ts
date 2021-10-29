/* eslint-disable @typescript-eslint/no-explicit-any */
import getProduct from "../../../api/product/getProduct"
import { getProductQuery } from "../../../queries"

jest.mock("@kibocommerce/graphql-client")

describe("[API] getProduct API handler", () => {
  const searchParams = "productCode eq 123"

  const req = {
    searchParams,
    _kiboClient: {
      query: ({ query, variables }) => {
        expect(query).toEqual(getProductQuery)
        expect(variables).toEqual(searchParams)
        return { data: "response" }
      },
    },
  }

  test("should get product", async () => {
    const response = await getProduct(req as any, null)
    expect(response).toEqual({ data: "response" })
  })
})
