/* eslint-disable @typescript-eslint/no-unused-vars */
import { searchProductQuery } from "../../queries"
import type { KiboIncomingMessage, Response, SearchProductResponse } from "../../types/Api"
import { getGQLClient } from "../../util"

export default async function searchProducts(
  req: KiboIncomingMessage,
  res: Response
): Promise<SearchProductResponse | string> {
  // Todo: implement searchProduct api
  return await "searchProducts boo"
}
