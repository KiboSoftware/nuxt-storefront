import { gql } from "graphql-tag"

export const categoryInfo = gql`
  fragment categoryInfo on PrCategory {
    categoryId
    categoryCode
    isDisplayed
    content {
      name
      slug
      description
    }
  }
`
