import * as types from "../../server/types/Api"
import { fetcher } from "../fetcher"

export const categoryApiHelper = {
  // Category
  getCategory: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.GetCategoryResponse> => fetcher(method, url, body),
}
