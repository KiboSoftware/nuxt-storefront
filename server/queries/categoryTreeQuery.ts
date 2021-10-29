import { gql } from "graphql-tag"
import { categoryInfo } from "../fragments"

export default gql`
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
