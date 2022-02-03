import type { CartItem } from "@/server/types/GraphQL"

// fulFillment
export type Fulfillment = {
  name?: string
  value?: string
  label?: string
  details?: string
  required?: boolean
  code?: string
  shortName?: string
  disabled?: boolean
  fulFillmentLocation?: string
  fulfillmentMethod?: string
  fulfillmentLocation?: string
  fulfillmentTypesSupported: string[]
}
