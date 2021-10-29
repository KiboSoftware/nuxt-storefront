import { getProductQuery } from "../../queries"
import type { KiboIncomingMessage, Response, GetProductResponse } from "../../types/Api"
import { getGQLClient } from "../../util"

export default async function getProduct(
  req: KiboIncomingMessage,
  res: Response
): Promise<GetProductResponse> {
  const client = getGQLClient(req, res)
  const variables = req?.searchParams

  return await client.query({
    query: getProductQuery,
    variables,
    fetchPolicy: "no-cache",
  })
}
