import { fetcher } from "./fetcher"
import * as types from "@/server/types/Api"

const apiHelper = {
  // useProduct
  getProduct: (method: string, url: string, body: {} = {}): Promise<types.GetProductResponse> =>
    fetcher(method, url, body),

  searchSuggestions: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.SearchProductResponse> => fetcher(method, url, body),

  configureProduct: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.ConfigureProductResponse> => fetcher(method, url, body),

  // useSearchRelatedProducts
  getProducts: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.SearchRelatedProductsResponse> => fetcher(method, url, body),
}

export default apiHelper
