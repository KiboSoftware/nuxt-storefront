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

  const variables = {
    productCode: params?.product?.productCode,
    selectedOptions: {
      options: params?.options,
    },
    includeOptionDetails: true,
  }

  return (await client.mutate({
    mutation: configureProductMutation,
    variables,
    fetchPolicy: "no-cache",
  })) as ConfigureProductResponse
}
