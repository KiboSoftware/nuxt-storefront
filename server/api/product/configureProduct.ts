/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureProductMutation } from "../../mutations"
import {
  ConfigureProductProductParams,
  ConfigureProductResponse,
  KiboIncomingMessage,
  Response,
} from "../../types/Api"
import { getGQLClient } from "../../util"

export default async function configureProduct(
  req: KiboIncomingMessage,
  res: Response
): Promise<ConfigureProductResponse> {
  const client = getGQLClient(req, res)
  const params = req?.body

  let attributes
  if (params?.attributes) {
    attributes = Object.keys(params?.attributes).map((a) => ({
      attributeFQN: `tenant~${a}`,
      value: params?.attributes[a],
    }))
  }

  const gqlMutation = {
    variables: {
      productCode: params?.product?.productCode,
      selectedOptions: {
        options: attributes,
      },
      includeOptionDetails: true,
    },
    mutation: configureProductMutation,
  }

  return (await client.mutate({
    mutation: gqlMutation.mutation,
    variables: gqlMutation.variables,
    fetchPolicy: "no-cache",
  })) as ConfigureProductResponse
}
