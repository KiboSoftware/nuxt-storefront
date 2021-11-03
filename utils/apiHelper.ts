import * as types from "../server/types/Api"
import { fetcher } from "./fetcher"

export const apiHelper = {
  // Category
  getCategoryTree: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.CategoryTreeResponse> => fetcher(method, url, body),
}

export default apiHelper
