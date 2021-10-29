import { getGQLClient } from "../../util"
import type { KiboIncomingMessage, Response } from "../../types/Api"
import { categoryTreeQuery } from "../../queries"

export default async function getCategoryTree(
  req: KiboIncomingMessage,
  res: Response
) {
  const variables = req?.searchParams
  const client = getGQLClient(req, res)
  return await client.query({
    query: categoryTreeQuery,
    variables,
  })
}
