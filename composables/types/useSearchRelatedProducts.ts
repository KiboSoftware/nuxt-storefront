import { Ref } from "@vue/composition-api"
import { CustomQuery } from "@/composables/types/common"

export type SearchRelatedProductsParams = {
  id: string
  limit: number
  catId: string[]
  customQuery?: CustomQuery
}

export type useSearchRelatedProductsResponse = {
  search: (params: SearchRelatedProductsParams) => Promise<void>
  result: Ref<{}>
  loading: Ref<boolean>
  error: Ref<string | {}>
}
