import { getGQLClient } from "../../util"
import type { KiboIncomingMessage, Response } from "../../types"
import { categoryQuery } from "../../queries"

export default async function getCategory(
  req: KiboIncomingMessage,
  res: Response
) {
  const variables = req?.searchParams
  const client = getGQLClient(req, res)
  return await client.query({
    query: categoryQuery,
    variables,
  })
}
