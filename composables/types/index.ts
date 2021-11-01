import type { PrCategory } from "../../server/types/GraphQL"

export interface uiHelpersReturnType {
  getCatLink?: (category: PrCategory) => string
}
