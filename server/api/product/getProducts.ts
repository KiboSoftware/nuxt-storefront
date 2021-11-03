/* eslint-disable @typescript-eslint/no-unused-vars */

import { getGQLClient } from "../../util"
import { getProductsQuery } from "../../queries"
import { KiboIncomingMessage, Response, SearchRelatedProductsResponse } from "../../types/Api"

export default async function searchRelatedProducts(
  req: KiboIncomingMessage,
  res: Response
): Promise<SearchRelatedProductsResponse> {
  const client = getGQLClient(req, res)
  const variables = req?.searchParams

  return await client.query({
    query: getProductsQuery,
    variables,
  })
}
