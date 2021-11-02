import * as GraphQL from "@/server/types/GraphQL"

export interface AgnosticAttribute {
  name?: string
  value: string | Record<string, string | number | boolean | {} | []>
  label: string
}

export type Filter = { size: String; color: String }

export type ProductGalleryItem = {
  mobile: { url: GraphQL.Maybe<string> | undefined }
  desktop: { url: GraphQL.Maybe<string> | undefined }
  big: { url: GraphQL.Maybe<string> | undefined }
  alt: GraphQL.Maybe<string> | undefined
}

export type Breadcrumb =
  | {
      link: string
    }
  | {
      text: string
      link: string
    }

export type Configuration = Record<string, string> | undefined

export type Product = {
  name: string | undefined | null
  description: string | undefined | null
  averageRating: number
  totalReviews: number
  priceRegular: number
  priceSpecial: number
  breadcrumbs: Breadcrumb[] | undefined
  options: Record<string, AgnosticAttribute | string>
  configuration: Configuration
  properties: Record<string, AgnosticAttribute | string>
  productGallery: ProductGalleryItem[]
}
