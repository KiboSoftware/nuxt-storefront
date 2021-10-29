/* eslint-disable import/no-named-as-default */
import gql from "graphql-tag"

export const searchProductQuery = gql`
  query getSearchSuggestions($term: String!) {
    suggestionSearch(query: $term, groups: "pages,categories") {
      suggestionGroups {
        name
        suggestions {
          suggestion
        }
      }
    }
  }
`
