import { getGQLClient } from "../util"
import type { KiboIncomingMessage, Response } from "../types/Api"
import { productDetailQuery } from "../queries"

export default async function getProduct(
  req: KiboIncomingMessage,
  res: Response
) {
  const variables = req?.searchParams
  const client = getGQLClient(req, res)
  return await client.query({
    query: productDetailQuery,
    variables,
  })
}
