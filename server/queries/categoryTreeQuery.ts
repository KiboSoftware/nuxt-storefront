import { gql } from "graphql-tag"
import { categoryInfo } from "../fragments"

export const categoryTreeQuery = gql`
  ${categoryInfo}

  query {
    categoriesTree {
      items {
        ...categoryInfo
        childrenCategories {
          ...categoryInfo
        }
      }
    }
  }
`
