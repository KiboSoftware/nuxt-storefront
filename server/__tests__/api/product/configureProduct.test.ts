/* eslint-disable @typescript-eslint/no-explicit-any */
import configureProduct from "../../../api/product/configureProduct"
import { configureProductMutation } from "../../../mutations"

jest.mock("@kibocommerce/graphql-client")

describe("[api] configureProduct API handler", () => {
  const body = {
    product: { productCode: "123" },
    options: [
      { attributeFQN: "tenant~color", value: "red" },
      { attributeFQN: "tenant~size", value: "L" },
    ],
  }

  const variablesExpectedValue = {
    productCode: body.product.productCode,
    selectedOptions: { options: body.options },
    includeOptionDetails: true,
  }

  const req = {
    body,
    _kiboClient: {
      mutate: ({ mutation, variables }) => {
        expect(mutation).toEqual(configureProductMutation)
        expect(variables).toEqual(variablesExpectedValue)
        return { data: "response" }
      },
    },
  }

  test("should configure product", async () => {
    const response = await configureProduct(req as any, null)
    expect(response).toEqual({ data: "response" })
  })
})
