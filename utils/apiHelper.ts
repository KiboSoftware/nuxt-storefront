import { fetcher } from "./fetcher"
import * as types from "@/server/types/Api"

const apiHelper = {
  configureProduct: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.ConfigureProductResponse> => fetcher(method, url, body),

  getProduct: (method: string, url: string, body: {} = {}): Promise<types.GetProductResponse> =>
    fetcher(method, url, body),

  searchRelatedProducts: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.SearchRelatedProductsResponse> => fetcher(method, url, body),

  searchProduct: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.SearchProductResponse> => fetcher(method, url, body),
  // Category
  getCategoryTree: (
    method: string,
    url: string,
    body: {} = {}
  ): Promise<types.CategoryTreeResponse> => fetcher(method, url, body),
}

export default apiHelper
