/* eslint-disable @typescript-eslint/no-unused-vars */
import { searchSuggestionsQuery } from "../../queries"
import type { KiboIncomingMessage, Response, SearchProductResponse } from "../../types/Api"
import { getGQLClient } from "../../util"

export default async function searchSuggestions(
  req: KiboIncomingMessage,
  res: Response
): Promise<SearchProductResponse | string> {
  // Todo: implement searchSuggestions api
  return await "searchSuggestions boo"
}
