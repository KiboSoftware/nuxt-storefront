import type { PrCategory } from "../../server/types/GraphQL"
type Maybe<T> = T | null

export interface AgnosticCategoryTree {
  label: string
  slug?: string
  items: AgnosticCategoryTree[]
  isCurrent: boolean
  count?: number
  [x: string]: unknown
}
export type ProductCategory = {
  categoryId: number
  parentCategory?: ProductCategory
  categoryCode?: string
  content: {
    name: string
    description?: string
    pageTitle?: string
    metaTagTitle?: string
    metaTagDescription?: string
    metaTagKeywords?: string
    slug: string
    categoryImages: [
      {
        altText?: string
        imageUrl: string
        cmsId: string
        sequence: number
      }
    ]
  }
  sequence: number
  isDisplayed: boolean
  count: number
  updateDate: string
  shouldSlice: boolean
}
export type RootCategory = {
  categoryId: number
  childrenCategories?: Maybe<RootCategory[]>
  categoryCode?: string
  content: {
    name: string
    description?: string
    pageTitle?: string
    metaTagTitle?: string
    metaTagDescription?: string
    metaTagKeywords?: string
    slug: string
    categoryImages: [
      {
        altText?: string
        imageUrl: string
        cmsId: string
        sequence: number
      }
    ]
  }
}

export type Category = {
  id: number
  label: string
  slug: string
  items: AgnosticCategoryTree[]
  rootCategory: PrCategory
  isCurrent: boolean
}

export interface uiHelpersReturnType {
  getCatLink?: (category: Category) => string
}
